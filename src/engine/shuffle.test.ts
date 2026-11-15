import { shuffle, makeRng } from './shuffle';

const twenty = Array.from({ length: 20 }, (_, i) => i);

test('same seed gives identical order', () => {
  expect(shuffle(twenty, 42)).toEqual(shuffle(twenty, 42));
});

test('different seeds give different order for a 20-item array', () => {
  expect(shuffle(twenty, 1)).not.toEqual(shuffle(twenty, 2));
});

test('result is a permutation (same sorted items)', () => {
  const out = shuffle(twenty, 7);
  expect([...out].sort((a, b) => a - b)).toEqual(twenty);
});

test('input array is not mutated', () => {
  const copy = [...twenty];
  shuffle(twenty, 9);
  expect(twenty).toEqual(copy);
});

test('empty and single-item arrays return unchanged', () => {
  expect(shuffle([], 1)).toEqual([]);
  expect(shuffle(['a'], 1)).toEqual(['a']);
});

test('makeRng yields values in [0,1) and is repeatable per seed', () => {
  const a = makeRng(5);
  const b = makeRng(5);
  for (let i = 0; i < 100; i++) {
    const v = a();
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThan(1);
    expect(v).toBe(b());
  }
});
