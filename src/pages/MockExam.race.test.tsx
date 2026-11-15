import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { InProgressMock, ProgressStore } from '../storage/ProgressStore';
import { newStore, renderApp } from '../test-utils';

/** Wraps a store so non-null in-progress saves resolve slowly, like a remote store would. */
function slowStore(delayMs: number): ProgressStore {
  const inner = newStore();
  return {
    getProgress: () => inner.getProgress(),
    markLessonComplete: (c, m) => inner.markLessonComplete(c, m),
    saveQuizAttempt: (a) => inner.saveQuizAttempt(a),
    saveMockAttempt: (a) => inner.saveMockAttempt(a),
    saveInProgressMock: async (m: InProgressMock | null) => {
      if (m) await new Promise((r) => setTimeout(r, delayMs));
      return inner.saveInProgressMock(m);
    },
    exportAll: () => inner.exportAll(),
    importAll: (j) => inner.importAll(j),
    get persistent() {
      return inner.persistent;
    },
  };
}

test('a slow in-progress save cannot land after submit and resurrect the finished exam', async () => {
  const store = slowStore(300);
  renderApp('/c/admin/mock', store);
  await userEvent.click(await screen.findByRole('button', { name: /start mock exam/i }));
  await userEvent.click(screen.queryAllByRole('radio')[0] ?? screen.queryAllByRole('checkbox')[0]);
  await userEvent.click(screen.getByRole('button', { name: /review & submit/i }));
  await userEvent.click(screen.getByRole('button', { name: /submit exam/i }));
  expect(await screen.findByRole('heading', { name: /mock exam results/i }, { timeout: 3000 })).toBeInTheDocument();
  await new Promise((r) => setTimeout(r, 600)); // let any straggling write land
  const p = await store.getProgress();
  expect(p.inProgressMock).toBeNull();
  expect(p.mockAttempts).toHaveLength(1);
});

test('if saving the attempt fails the learner sees an error and can try again', async () => {
  const inner = newStore();
  let fail = true;
  const store: ProgressStore = {
    getProgress: () => inner.getProgress(),
    markLessonComplete: (c, m) => inner.markLessonComplete(c, m),
    saveQuizAttempt: (a) => inner.saveQuizAttempt(a),
    saveMockAttempt: async (a) => {
      if (fail) throw new Error('network');
      return inner.saveMockAttempt(a);
    },
    saveInProgressMock: (m) => inner.saveInProgressMock(m),
    exportAll: () => inner.exportAll(),
    importAll: (j) => inner.importAll(j),
    persistent: true,
  };
  renderApp('/c/admin/mock', store);
  await userEvent.click(await screen.findByRole('button', { name: /start mock exam/i }));
  await userEvent.click(screen.getByRole('button', { name: /review & submit/i }));
  await userEvent.click(screen.getByRole('button', { name: /submit exam/i }));
  expect(await screen.findByRole('alert')).toHaveTextContent(/could not submit/i);
  fail = false;
  await userEvent.click(screen.getByRole('button', { name: /submit exam/i }));
  expect(await screen.findByRole('heading', { name: /mock exam results/i })).toBeInTheDocument();
});
