import { Link, useParams } from 'react-router-dom';
import { loadCourse, loadModule } from '../content/loader';
import { readiness } from '../engine/readiness';
import { useProgress } from '../storage/useProgress';
import type { Course } from '../types';
import NotFound from './NotFound';

function tryLoadCourse(id?: string): Course | null {
  try {
    return id ? loadCourse(id) : null;
  } catch {
    return null;
  }
}

const READINESS_TEXT = {
  'not-started': 'not started (take a full mock exam)',
  building: 'building (keep practising)',
  ready: 'ready for the exam',
} as const;

export default function Results() {
  const { courseId, attemptIndex } = useParams();
  const course = tryLoadCourse(courseId);
  const { progress, loaded } = useProgress();
  if (!course) return <NotFound what="Course" />;
  if (!loaded) return <p>Loading…</p>;

  const attempt = progress.mockAttempts[Number(attemptIndex)];
  if (!attempt || attempt.courseId !== course.id) return <NotFound what="Result" />;

  const modules = course.moduleIds.map((id) => loadModule(course.id, id).meta);
  const scored = course.exam.sections.filter((s) => attempt.bySection[s.id]);
  const weakest = [...scored].sort((a, b) => attempt.bySection[a.id].percent - attempt.bySection[b.id].percent).slice(0, 2);
  const unanswered = attempt.questionIds.filter((id) => (attempt.answers[id] ?? []).length === 0).length;
  const state = readiness(progress.mockAttempts.filter((a) => a.courseId === course.id), course.exam);

  return (
    <section>
      <h2>Mock exam results</h2>
      {attempt.partial && (
        <p className="banner">Preview mock: the question bank is incomplete, so this score is not a full exam result.</p>
      )}
      <p>Score: {attempt.percent}%</p>
      <p>{attempt.passed ? 'Passed' : 'Not passed'} (pass mark {course.exam.passPercent}%)</p>
      <p>Unanswered: {unanswered}</p>
      <p>Readiness: {READINESS_TEXT[state]}</p>
      <h3>By section</h3>
      <ul>
        {scored.map((s) => {
          const r = attempt.bySection[s.id];
          return (
            <li key={s.id}>
              {s.name}: {r.percent}% ({r.correct}/{r.total})
            </li>
          );
        })}
      </ul>
      {weakest.length > 0 && (
        <>
          <h3>Focus on these sections</h3>
          {weakest.map((s) => {
            const mods = modules.filter((m) => m.examSection === s.id);
            return (
              <div className="panel" key={s.id}>
                <strong>{s.name}</strong>
                {mods.length === 0 ? (
                  <p>Lessons for this section are coming soon.</p>
                ) : (
                  <ul>
                    {mods.map((m) => (
                      <li key={m.id}>
                        <Link to={`/c/${course.id}/m/${m.id}`}>{m.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </>
      )}
      <p>
        <Link to={`/c/${course.id}/mock`}>Take another mock exam</Link>
      </p>
    </section>
  );
}
