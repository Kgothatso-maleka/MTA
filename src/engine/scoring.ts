import type { ExamConfig, Question } from '../types';

export interface SectionScore {
  correct: number;
  total: number;
  percent: number;
}

export interface AttemptResult {
  correct: number;
  total: number;
  percent: number;
  passed: boolean;
  unanswered: number;
  bySection: Record<string, SectionScore>;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/** All-or-nothing: the selected set must equal the correct set exactly. */
export function scoreQuestion(q: Question, selected: string[]): boolean {
  const sel = new Set(selected);
  const cor = new Set(q.correct);
  if (sel.size !== cor.size) return false;
  for (const id of cor) if (!sel.has(id)) return false;
  return true;
}

export function scoreAttempt(
  questions: Question[],
  answers: Record<string, string[]>,
  exam: ExamConfig,
): AttemptResult {
  let correct = 0;
  let unanswered = 0;
  const bySection: Record<string, SectionScore> = {};
  for (const q of questions) {
    const sel = answers[q.id] ?? [];
    const section = (bySection[q.examSection] ??= { correct: 0, total: 0, percent: 0 });
    section.total += 1;
    if (sel.length === 0) unanswered += 1;
    if (scoreQuestion(q, sel)) {
      correct += 1;
      section.correct += 1;
    }
  }
  for (const s of Object.values(bySection)) s.percent = round1((s.correct / s.total) * 100);
  const total = questions.length;
  const percent = total === 0 ? 0 : round1((correct / total) * 100);
  return { correct, total, percent, passed: total > 0 && percent >= exam.passPercent, unanswered, bySection };
}
