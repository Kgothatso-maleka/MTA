import type { ExamConfig } from '../types';

export interface AttemptSummary {
  percent: number;
  partial: boolean;
  takenAt: number;
}

export type Readiness = 'not-started' | 'building' | 'ready';

/** Ready when the last two FULL mocks are at least passPercent + readyMarginPoints. */
export function readiness(attempts: AttemptSummary[], exam: ExamConfig): Readiness {
  const full = attempts.filter((a) => !a.partial).sort((a, b) => a.takenAt - b.takenAt);
  if (full.length === 0) return 'not-started';
  const bar = exam.passPercent + exam.readyMarginPoints;
  const lastTwo = full.slice(-2);
  return lastTwo.length === 2 && lastTwo.every((a) => a.percent >= bar) ? 'ready' : 'building';
}
