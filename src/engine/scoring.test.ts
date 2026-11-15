import { scoreAttempt, scoreQuestion } from './scoring';
import type { ExamConfig, Question } from '../types';

const exam: ExamConfig = {
  guideVersion: 't', questionCount: 4, timeLimitMinutes: 10, passPercent: 65, readyMarginPoints: 10,
  sections: [{ id: 's1', name: 'S1', weight: 50 }, { id: 's2', name: 'S2', weight: 50 }],
};
const mk = (id: string, section: string, type: 'single' | 'multi', correct: string[]): Question => ({
  id, moduleId: 'm', examSection: section, objective: 'o', type, stem: 'q',
  options: ['a', 'b', 'c', 'd'].map((x) => ({ id: x, text: x })),
  correct, explanation: 'e', difficulty: 1, tags: [],
});
const single = mk('q1', 's1', 'single', ['a']);
const multi = mk('q2', 's1', 'multi', ['a', 'c']);

test('single correct', () => expect(scoreQuestion(single, ['a'])).toBe(true));
test('single wrong', () => expect(scoreQuestion(single, ['b'])).toBe(false));
test('multi exact set is correct regardless of order', () => expect(scoreQuestion(multi, ['c', 'a'])).toBe(true));
test('multi missing one option is wrong', () => expect(scoreQuestion(multi, ['a'])).toBe(false));
test('multi with an extra option is wrong', () => expect(scoreQuestion(multi, ['a', 'c', 'd'])).toBe(false));
test('unknown option ids are wrong, no throw', () => expect(scoreQuestion(single, ['zzz'])).toBe(false));

test('unanswered counts as wrong and increments unanswered', () => {
  const r = scoreAttempt([single, multi], { q1: ['a'] }, exam);
  expect(r.correct).toBe(1);
  expect(r.total).toBe(2);
  expect(r.unanswered).toBe(1);
});

test('an empty selection array counts as unanswered', () => {
  const r = scoreAttempt([single], { q1: [] }, exam);
  expect(r.unanswered).toBe(1);
  expect(r.correct).toBe(0);
});

test('percent is rounded to 1 decimal and passed uses >= passPercent', () => {
  const qs = [mk('a1', 's1', 'single', ['a']), mk('a2', 's1', 'single', ['a']), mk('a3', 's1', 'single', ['a'])];
  const r = scoreAttempt(qs, { a1: ['a'], a2: ['a'], a3: ['b'] }, exam);
  expect(r.percent).toBe(66.7);
  expect(r.passed).toBe(true);
  const r2 = scoreAttempt(qs, { a1: ['a'], a2: ['b'], a3: ['b'] }, exam);
  expect(r2.passed).toBe(false);
});

test('bySection totals match question counts', () => {
  const q3 = mk('q3', 's2', 'single', ['b']);
  const r = scoreAttempt([single, multi, q3], { q1: ['a'], q2: ['a', 'c'], q3: ['b'] }, exam);
  expect(r.bySection.s1).toEqual({ correct: 2, total: 2, percent: 100 });
  expect(r.bySection.s2).toEqual({ correct: 1, total: 1, percent: 100 });
});

test('empty questions list returns 0 percent, passed false', () => {
  const r = scoreAttempt([], {}, exam);
  expect(r.percent).toBe(0);
  expect(r.passed).toBe(false);
});
