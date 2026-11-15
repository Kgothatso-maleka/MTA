import { useMemo, useState } from 'react';
import { scoreQuestion } from '../engine/scoring';
import { shuffle } from '../engine/shuffle';
import type { Question } from '../types';

interface Props {
  questions: Question[];
  seed: number;
  mode: 'check' | 'practice';
  onFinish: (answers: Record<string, string[]>) => void;
}

export default function QuizRunner({ questions, seed, mode, onFinish }: Props) {
  const ordered = useMemo(
    () => shuffle(questions, seed).map((q, i) => ({ ...q, options: shuffle(q.options, seed + (i + 1) * 7919) })),
    [questions, seed],
  );
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  if (ordered.length === 0) return <p>No questions available yet.</p>;
  const q = ordered[index];
  const isLast = index === ordered.length - 1;
  const correct = submitted && scoreQuestion(q, selected);

  const toggle = (id: string) => {
    if (submitted) return;
    if (q.type === 'single') setSelected([id]);
    else setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const next = () => {
    const all = { ...answers, [q.id]: selected };
    setAnswers(all);
    if (isLast) {
      onFinish(all);
      return;
    }
    setIndex(index + 1);
    setSelected([]);
    setSubmitted(false);
  };

  return (
    <div className="panel" data-mode={mode}>
      <p>
        Question {index + 1} of {ordered.length}
      </p>
      <fieldset style={{ border: 0, padding: 0 }}>
        <legend>{q.stem}</legend>
        {q.type === 'multi' && <p>Choose {q.correct.length}</p>}
        {q.options.map((o) => (
          <label className="option" key={o.id}>
            <input
              type={q.type === 'single' ? 'radio' : 'checkbox'}
              name={q.id}
              checked={selected.includes(o.id)}
              disabled={submitted}
              onChange={() => toggle(o.id)}
            />
            {o.text}
          </label>
        ))}
      </fieldset>
      {!submitted ? (
        <button disabled={selected.length === 0} onClick={() => setSubmitted(true)}>
          Submit answer
        </button>
      ) : (
        <div>
          <p role="status">{correct ? 'Correct' : 'Incorrect'}</p>
          {!correct && (
            <p>
              The right answer: {q.options.filter((o) => q.correct.includes(o.id)).map((o) => o.text).join('; ')}
            </p>
          )}
          <p>{q.explanation}</p>
          <button onClick={next}>{isLast ? 'Finish' : 'Next'}</button>
        </div>
      )}
    </div>
  );
}
