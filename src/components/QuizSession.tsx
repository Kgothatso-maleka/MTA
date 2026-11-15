import { useMemo, useState } from 'react';
import { scoreQuestion } from '../engine/scoring';
import { shuffle } from '../engine/shuffle';
import { useStore } from '../storage/StoreContext';
import type { Question } from '../types';
import QuizRunner from './QuizRunner';

interface Props {
  courseId: string;
  moduleId: string; // module id, or "section:<id>" for section practice
  questions: Question[];
  mode: 'check' | 'practice';
  limit: number;
}

const newSeed = () => Math.floor(Math.random() * 2 ** 31);

/** Draws a random subset, runs it, saves the attempt, and shows the score. */
export default function QuizSession({ courseId, moduleId, questions, mode, limit }: Props) {
  const store = useStore();
  const [seed, setSeed] = useState(newSeed);
  const [summary, setSummary] = useState<{ correct: number; total: number } | null>(null);
  const drawn = useMemo(() => shuffle(questions, seed).slice(0, limit), [questions, seed, limit]);

  const finish = async (answers: Record<string, string[]>) => {
    const correct = drawn.filter((q) => scoreQuestion(q, answers[q.id] ?? [])).length;
    await store.saveQuizAttempt({ courseId, moduleId, seed, answers, correct, total: drawn.length, takenAt: Date.now() });
    setSummary({ correct, total: drawn.length });
  };

  if (summary) {
    return (
      <div className="panel">
        <p>
          You scored {summary.correct} of {summary.total}.
        </p>
        <button
          onClick={() => {
            setSummary(null);
            setSeed(newSeed());
          }}
        >
          Try another set
        </button>
      </div>
    );
  }
  return <QuizRunner key={seed} questions={drawn} seed={seed} mode={mode} onFinish={finish} />;
}
