import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Timer from '../components/Timer';
import { loadCourse, loadQuestions } from '../content/loader';
import { applyOptionOrder, buildMock, sectionQuotas } from '../engine/mock';
import { scoreAttempt } from '../engine/scoring';
import { useStore } from '../storage/StoreContext';
import type { Course, Question } from '../types';
import NotFound from './NotFound';

interface Session {
  seed: number;
  questions: Question[];
  answers: Record<string, string[]>;
  flagged: string[];
  deadlineMs: number;
}

type Phase = 'loading' | 'start' | 'exam' | 'review';

function tryLoadCourse(id?: string): Course | null {
  try {
    return id ? loadCourse(id) : null;
  } catch {
    return null;
  }
}

export default function MockExam() {
  const { courseId } = useParams();
  const course = tryLoadCourse(courseId);
  const store = useStore();
  const navigate = useNavigate();
  const bank = useMemo(() => (course ? loadQuestions(course.id) : []), [course]);
  const [phase, setPhase] = useState<Phase>('loading');
  const [session, setSession] = useState<Session | null>(null);
  const [index, setIndex] = useState(0);
  const sessionRef = useRef<Session | null>(null);
  const submitting = useRef(false);
  const writes = useRef<Promise<unknown>>(Promise.resolve());
  const attemptSaved = useRef(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const preview = useMemo(
    () => (course ? buildMock(bank, course.exam, 1, []) : null),
    [bank, course],
  );

  /** Store writes run strictly in order, so a slow save can never land after the submit that clears it. */
  const persist = useCallback(
    (s: Session) => {
      if (!course || submitting.current) return;
      const snapshot = {
        courseId: course.id,
        seed: s.seed,
        questionIds: s.questions.map((q) => q.id),
        answers: s.answers,
        flagged: s.flagged,
        deadlineMs: s.deadlineMs,
      };
      writes.current = writes.current.then(() => store.saveInProgressMock(snapshot)).catch(() => undefined);
    },
    [store, course],
  );

  const update = (next: Session) => {
    sessionRef.current = next;
    setSession(next);
    persist(next);
  };

  const submit = useCallback(async () => {
    const s = sessionRef.current;
    if (!s || !course || submitting.current) return;
    submitting.current = true;
    setSubmitError(null);
    try {
      await writes.current; // queued answer saves finish before the attempt is written
      if (!attemptSaved.current) {
        const result = scoreAttempt(s.questions, s.answers, course.exam);
        const quotas = sectionQuotas(course.exam);
        const counts: Record<string, number> = {};
        for (const q of s.questions) counts[q.examSection] = (counts[q.examSection] ?? 0) + 1;
        const partial =
          s.questions.length < course.exam.questionCount ||
          course.exam.sections.some((sec) => (counts[sec.id] ?? 0) < quotas[sec.id]);
        await store.saveMockAttempt({
          courseId: course.id,
          seed: s.seed,
          questionIds: s.questions.map((q) => q.id),
          answers: s.answers,
          percent: result.percent,
          passed: result.passed,
          partial,
          bySection: result.bySection,
          takenAt: Date.now(),
        });
        attemptSaved.current = true; // a retry after a later failure must not record a second attempt
      }
      await store.saveInProgressMock(null);
      const p = await store.getProgress();
      navigate(`/c/${course.id}/results/${p.mockAttempts.length - 1}`);
    } catch {
      submitting.current = false;
      setSubmitError('Could not submit your exam. Check your connection and try again. Your answers are kept.');
    }
  }, [course, navigate, store]);

  useEffect(() => {
    if (!course) return;
    let cancelled = false;
    (async () => {
      const p = await store.getProgress();
      if (cancelled) return;
      const ip = p.inProgressMock;
      if (ip && ip.courseId === course.id) {
        const found = ip.questionIds
          .map((id) => bank.find((q) => q.id === id))
          .filter((q): q is Question => Boolean(q));
        if (found.length > 0) {
          const s: Session = {
            seed: ip.seed,
            questions: applyOptionOrder(found, ip.seed),
            answers: ip.answers,
            flagged: ip.flagged,
            deadlineMs: ip.deadlineMs,
          };
          sessionRef.current = s;
          setSession(s);
          setPhase('exam');
          if (ip.deadlineMs <= Date.now()) void submit();
          return;
        }
        await store.saveInProgressMock(null); // content changed under it: drop the stale exam
      }
      setPhase('start');
    })();
    return () => {
      cancelled = true;
    };
  }, [course, bank, store, submit]);

  if (!course) return <NotFound what="Course" />;
  if (phase === 'loading') return <p>Loading…</p>;

  const start = async () => {
    const p = await store.getProgress();
    const last = [...p.mockAttempts].reverse().find((a) => a.courseId === course.id);
    const seed = Math.floor(Math.random() * 2 ** 31);
    const mock = buildMock(bank, course.exam, seed, last?.questionIds ?? []);
    if (mock.questions.length === 0) return;
    setIndex(0);
    submitting.current = false;
    attemptSaved.current = false;
    update({
      seed,
      questions: mock.questions,
      answers: {},
      flagged: [],
      deadlineMs: Date.now() + course.exam.timeLimitMinutes * 60000,
    });
    setPhase('exam');
  };

  const incomplete = preview && Object.keys(preview.shortfalls).length > 0;
  const banner = <p className="banner">Preview mock: the question bank is incomplete, so this exam is shorter than the real one.</p>;

  if (phase === 'start' || !session) {
    return (
      <section>
        <p><Link to={`/c/${course.id}`}>← Back to course</Link></p>
        <h2>Mock exam</h2>
        <p>
          {course.exam.questionCount} questions · {course.exam.timeLimitMinutes} minutes · pass mark {course.exam.passPercent}%
        </p>
        <p>Questions and answers are shuffled every attempt. You only see results at the end.</p>
        {incomplete && banner}
        {bank.length === 0 ? <p>No questions available yet.</p> : <button onClick={start}>Start mock exam</button>}
      </section>
    );
  }

  const q = session.questions[index];
  const sel = session.answers[q.id] ?? [];
  const answered = session.questions.filter((x) => (session.answers[x.id] ?? []).length > 0).length;

  const choose = (id: string) => {
    const next = q.type === 'single' ? [id] : sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id];
    update({ ...session, answers: { ...session.answers, [q.id]: next } });
  };
  const toggleFlag = () => {
    const flagged = session.flagged.includes(q.id) ? session.flagged.filter((x) => x !== q.id) : [...session.flagged, q.id];
    update({ ...session, flagged });
  };

  if (phase === 'review') {
    return (
      <section>
        <h2>Review before submitting</h2>
        <p>Time left: <Timer deadlineMs={session.deadlineMs} onExpire={() => void submit()} /></p>
        <ul>
          <li>Answered: {answered}</li>
          <li>Flagged: {session.flagged.length}</li>
          <li>Unanswered: {session.questions.length - answered}</li>
        </ul>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {session.questions.map((x, i) => (
            <button
              key={x.id}
              className="secondary"
              aria-label={`Question ${i + 1}${session.flagged.includes(x.id) ? ' (flagged)' : ''}${(session.answers[x.id] ?? []).length ? '' : ' (unanswered)'}`}
              onClick={() => {
                setIndex(i);
                setPhase('exam');
              }}
            >
              {i + 1}
              {session.flagged.includes(x.id) ? '⚑' : ''}
            </button>
          ))}
        </div>
        {submitError && <p role="alert">{submitError}</p>}
        <p>
          <button className="secondary" onClick={() => setPhase('exam')}>Back to exam</button>{' '}
          <button onClick={() => void submit()}>Submit exam</button>
        </p>
      </section>
    );
  }

  return (
    <section>
      <p>Time left: <Timer deadlineMs={session.deadlineMs} onExpire={() => void submit()} /></p>
      {submitError && <p role="alert">{submitError}</p>}
      <p>Question {index + 1} of {session.questions.length}</p>
      <fieldset style={{ border: 0, padding: 0 }}>
        <legend>{q.stem}</legend>
        {q.type === 'multi' && <p>Choose {q.correct.length}</p>}
        {q.options.map((o) => (
          <label className="option" key={o.id}>
            <input
              type={q.type === 'single' ? 'radio' : 'checkbox'}
              name={q.id}
              checked={sel.includes(o.id)}
              onChange={() => choose(o.id)}
            />
            {o.text}
          </label>
        ))}
      </fieldset>
      <p>
        <button className="secondary" onClick={toggleFlag}>
          {session.flagged.includes(q.id) ? 'Remove flag' : 'Flag for review'}
        </button>{' '}
        <button className="secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}>Previous</button>{' '}
        <button className="secondary" disabled={index === session.questions.length - 1} onClick={() => setIndex(index + 1)}>Next</button>{' '}
        <button onClick={() => setPhase('review')}>Review &amp; submit</button>
      </p>
    </section>
  );
}
