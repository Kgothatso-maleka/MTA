import { loadCourse, loadQuestions } from './loader';

test('loadCourse returns a stable object per id so React effects keyed on it do not loop', () => {
  expect(loadCourse('admin')).toBe(loadCourse('admin'));
});

test('loadQuestions returns a stable array per (course, module) call signature', () => {
  expect(loadQuestions('admin')).toBe(loadQuestions('admin'));
});

test('unknown course throws', () => {
  expect(() => loadCourse('nope')).toThrow(/unknown course/i);
});
