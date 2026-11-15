import type { ExamConfig, Question } from '../types';
import { shuffle } from './shuffle';

export interface Mock {
  seed: number;
  questions: Question[];
  shortfalls: Record<string, number>;
}

/** Largest-remainder allocation of `total` across weighted sections. */
export function sectionQuotas(exam: ExamConfig): Record<string, number> {
  const weightSum = exam.sections.reduce((n, s) => n + s.weight, 0) || 1;
  const exact = exam.sections.map((s) => ({ id: s.id, v: (s.weight / weightSum) * exam.questionCount }));
  const out: Record<string, number> = {};
  for (const e of exact) out[e.id] = Math.floor(e.v);
  let remaining = exam.questionCount - Object.values(out).reduce((a, b) => a + b, 0);
  const byRemainder = [...exact].sort((a, b) => b.v - Math.floor(b.v) - (a.v - Math.floor(a.v)));
  for (const e of byRemainder) {
    if (remaining <= 0) break;
    out[e.id] += 1;
    remaining -= 1;
  }
  return out;
}

/** Unseen questions first (shuffled), then seen ones (shuffled). */
function preferUnseen(qs: Question[], seen: Set<string>, seed: number): Question[] {
  const fresh = qs.filter((q) => !seen.has(q.id));
  const old = qs.filter((q) => seen.has(q.id));
  return [...shuffle(fresh, seed), ...shuffle(old, seed + 1)];
}

/** Option order for the question at position i is seeded by (seed, i), so a resumed exam rebuilds identically. */
export function applyOptionOrder(questions: Question[], seed: number): Question[] {
  return questions.map((q, i) => ({ ...q, options: shuffle(q.options, seed + (i + 1) * 7919) }));
}

export function buildMock(bank: Question[], exam: ExamConfig, seed: number, recentlySeen: string[]): Mock {
  const seen = new Set(recentlySeen);
  const quota = sectionQuotas(exam);
  const chosen: Question[] = [];
  const shortfalls: Record<string, number> = {};

  exam.sections.forEach((section, i) => {
    const pool = preferUnseen(
      bank.filter((q) => q.examSection === section.id),
      seen,
      seed + i * 101,
    );
    const take = pool.slice(0, quota[section.id]);
    chosen.push(...take);
    const short = quota[section.id] - take.length;
    if (short > 0) shortfalls[section.id] = short;
  });

  const missing = Object.values(shortfalls).reduce((a, b) => a + b, 0);
  if (missing > 0) {
    const used = new Set(chosen.map((q) => q.id));
    const leftovers = preferUnseen(
      bank.filter((q) => !used.has(q.id) && exam.sections.some((s) => s.id === q.examSection)),
      seen,
      seed + 997,
    );
    chosen.push(...leftovers.slice(0, missing));
  }

  const questions = applyOptionOrder(shuffle(chosen, seed), seed);
  return { seed, questions, shortfalls };
}
