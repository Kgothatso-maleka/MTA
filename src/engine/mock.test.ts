import { buildMock } from './mock';
import type { ExamConfig, Question } from '../types';

const exam = (count: number): ExamConfig => ({
  guideVersion: 't', questionCount: count, timeLimitMinutes: 10, passPercent: 65, readyMarginPoints: 10,
  sections: [
    { id: 'a', name: 'A', weight: 15 }, { id: 'b', name: 'B', weight: 17 }, { id: 'c', name: 'C', weight: 8 },
    { id: 'd', name: 'D', weight: 60 },
  ],
});
const q = (id: string, section: string): Question => ({
  id, moduleId: 'm', examSection: section, objective: 'o', type: 'single', stem: 's',
  options: ['1', '2', '3', '4', '5'].map((x) => ({ id: x, text: x })),
  correct: ['1'], explanation: 'e', difficulty: 1, tags: [],
});
const bank = (perSection: number): Question[] =>
  ['a', 'b', 'c', 'd'].flatMap((s) => Array.from({ length: perSection }, (_, i) => q(`${s}${i}`, s)));

test('quotas follow section weights using largest-remainder so they sum to questionCount', () => {
  const m = buildMock(bank(80), exam(60), 1, []);
  expect(m.questions).toHaveLength(60);
  const count = (s: string) => m.questions.filter((x) => x.examSection === s).length;
  expect([count('a'), count('b'), count('c'), count('d')]).toEqual([9, 10, 5, 36]);
});

test('same seed gives the same mock', () => {
  const a = buildMock(bank(80), exam(60), 5, []);
  const b = buildMock(bank(80), exam(60), 5, []);
  expect(a.questions.map((x) => x.id)).toEqual(b.questions.map((x) => x.id));
  expect(a.questions[0].options.map((o) => o.id)).toEqual(b.questions[0].options.map((o) => o.id));
});

test('option order differs from bank order for some question given a seed', () => {
  const m = buildMock(bank(80), exam(60), 3, []);
  expect(m.questions.some((x) => x.options.map((o) => o.id).join('') !== '12345')).toBe(true);
});

test('prefers questions not in recentlySeen when the bank is large enough', () => {
  const all = bank(80);
  const seen = all.filter((x) => x.examSection === 'd').slice(0, 40).map((x) => x.id);
  const m = buildMock(all, exam(60), 2, seen);
  expect(m.questions.filter((x) => seen.includes(x.id))).toHaveLength(0);
});

test('section with too few questions: shortfall recorded and filled from other sections, no crash', () => {
  const small = [...bank(80).filter((x) => x.examSection !== 'c'), q('c0', 'c'), q('c1', 'c')];
  const m = buildMock(small, exam(60), 4, []);
  expect(m.questions).toHaveLength(60);
  expect(m.shortfalls.c).toBe(3);
  expect(m.questions.filter((x) => x.examSection === 'c')).toHaveLength(2);
});

test('empty bank returns empty questions and shortfalls equal to the quotas', () => {
  const m = buildMock([], exam(60), 1, []);
  expect(m.questions).toEqual([]);
  expect(m.shortfalls).toEqual({ a: 9, b: 10, c: 5, d: 36 });
});

test('bank smaller than questionCount returns what exists, with shortfall total = missing', () => {
  const m = buildMock(bank(2), exam(60), 1, []);
  expect(m.questions).toHaveLength(8);
  expect(Object.values(m.shortfalls).reduce((x, y) => x + y, 0)).toBe(52);
});

test('no duplicate question ids', () => {
  const m = buildMock(bank(80), exam(60), 9, []);
  expect(new Set(m.questions.map((x) => x.id)).size).toBe(m.questions.length);
});
