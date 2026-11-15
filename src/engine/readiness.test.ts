import { readiness } from './readiness';
import type { ExamConfig } from '../types';

const exam: ExamConfig = { guideVersion: 't', questionCount: 60, timeLimitMinutes: 105, passPercent: 65, readyMarginPoints: 10, sections: [] };
const a = (percent: number, takenAt: number, partial = false) => ({ percent, partial, takenAt });

test('no full attempts is not-started', () => {
  expect(readiness([], exam)).toBe('not-started');
  expect(readiness([a(90, 1, true)], exam)).toBe('not-started');
});
test('one full attempt below the bar is building', () => expect(readiness([a(80, 1)], exam)).toBe('building'));
test('last two full attempts at least passPercent + readyMarginPoints is ready', () => {
  expect(readiness([a(75, 1), a(76, 2)], exam)).toBe('ready');
});
test('partial attempts are ignored', () => {
  expect(readiness([a(90, 1), a(90, 2, true), a(60, 3, true)], exam)).toBe('building');
});
test('a later low score drops ready to building', () => {
  expect(readiness([a(80, 1), a(80, 2), a(50, 3)], exam)).toBe('building');
});
test('attempts are ordered by takenAt, not array position', () => {
  expect(readiness([a(50, 3), a(80, 1), a(80, 2)], exam)).toBe('building');
});
