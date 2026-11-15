import { LocalStorageStore } from './LocalStorageStore';
import type { MockAttempt, QuizAttempt } from './ProgressStore';

class FakeStorage implements Storage {
  data = new Map<string, string>();
  throwOnSet = false;
  get length() { return this.data.size; }
  clear() { this.data.clear(); }
  getItem(k: string) { return this.data.has(k) ? this.data.get(k)! : null; }
  key(i: number) { return [...this.data.keys()][i] ?? null; }
  removeItem(k: string) { this.data.delete(k); }
  setItem(k: string, v: string) {
    if (this.throwOnSet) throw new DOMException('quota', 'QuotaExceededError');
    this.data.set(k, v);
  }
}

const quiz: QuizAttempt = { courseId: 'admin', moduleId: 'm1', seed: 1, answers: { q1: ['a'] }, correct: 1, total: 1, takenAt: 100 };
const mock: MockAttempt = {
  courseId: 'admin', seed: 2, questionIds: ['q1'], answers: { q1: ['a'] }, percent: 100, passed: true, partial: false,
  bySection: { s1: { correct: 1, total: 1, percent: 100 } }, takenAt: 200,
};
const KEY = 'mta-progress-v1';

test('empty store returns version 1 empty progress', async () => {
  const p = await new LocalStorageStore(new FakeStorage()).getProgress();
  expect(p).toEqual({ version: 1, completedModules: {}, quizAttempts: [], mockAttempts: [], inProgressMock: null });
});

test('markLessonComplete is idempotent', async () => {
  const s = new LocalStorageStore(new FakeStorage());
  await s.markLessonComplete('admin', 'm1');
  await s.markLessonComplete('admin', 'm1');
  expect((await s.getProgress()).completedModules.admin).toEqual(['m1']);
});

test('saved attempts persist across a new store instance on the same Storage', async () => {
  const fake = new FakeStorage();
  const a = new LocalStorageStore(fake);
  await a.saveQuizAttempt(quiz);
  await a.saveMockAttempt(mock);
  const p = await new LocalStorageStore(fake).getProgress();
  expect(p.quizAttempts).toEqual([quiz]);
  expect(p.mockAttempts).toEqual([mock]);
});

test('corrupt JSON in storage returns empty progress', async () => {
  const fake = new FakeStorage();
  fake.setItem(KEY, '{not json');
  expect((await new LocalStorageStore(fake).getProgress()).mockAttempts).toEqual([]);
});

test('wrong version returns empty progress', async () => {
  const fake = new FakeStorage();
  fake.setItem(KEY, JSON.stringify({ version: 99, completedModules: { admin: ['x'] } }));
  expect((await new LocalStorageStore(fake).getProgress()).completedModules).toEqual({});
});

test('exportAll then importAll round-trips', async () => {
  const a = new LocalStorageStore(new FakeStorage());
  await a.markLessonComplete('admin', 'm1');
  await a.saveMockAttempt(mock);
  const json = await a.exportAll();
  const b = new LocalStorageStore(new FakeStorage());
  await b.importAll(json);
  expect(await b.getProgress()).toEqual(await a.getProgress());
});

test('importAll rejects invalid JSON and wrong shape, leaving existing progress intact', async () => {
  const s = new LocalStorageStore(new FakeStorage());
  await s.markLessonComplete('admin', 'm1');
  await expect(s.importAll('nope')).rejects.toThrow();
  await expect(s.importAll(JSON.stringify({ version: 1, completedModules: 5 }))).rejects.toThrow();
  expect((await s.getProgress()).completedModules.admin).toEqual(['m1']);
});

test('storage whose setItem throws: store keeps working in memory and persistent is false', async () => {
  const fake = new FakeStorage();
  fake.throwOnSet = true;
  const s = new LocalStorageStore(fake);
  expect(s.persistent).toBe(true);
  await s.markLessonComplete('admin', 'm1');
  expect(s.persistent).toBe(false);
  expect((await s.getProgress()).completedModules.admin).toEqual(['m1']);
});

test('saveInProgressMock(null) clears it', async () => {
  const s = new LocalStorageStore(new FakeStorage());
  await s.saveInProgressMock({ courseId: 'admin', seed: 1, questionIds: ['q1'], answers: {}, flagged: [], deadlineMs: 5 });
  expect((await s.getProgress()).inProgressMock).not.toBeNull();
  await s.saveInProgressMock(null);
  expect((await s.getProgress()).inProgressMock).toBeNull();
});
