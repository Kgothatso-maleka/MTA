import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadCourse, loadModule } from '../content/loader';
import { newStore, renderApp } from '../test-utils';

const course = loadCourse('admin');
const firstTitle = loadModule('admin', course.moduleIds[0]).meta.title;
const start = async () => userEvent.click(await screen.findByRole('button', { name: /start mock exam/i }));
const pick = async () =>
  userEvent.click([...screen.queryAllByRole('radio'), ...screen.queryAllByRole('checkbox')][0]);

test('starting stores an in-progress mock with a deadline', async () => {
  const store = newStore();
  renderApp('/c/admin/mock', store);
  const before = Date.now();
  await start();
  const p = await store.getProgress();
  expect(p.inProgressMock).not.toBeNull();
  const expected = before + course.exam.timeLimitMinutes * 60000;
  expect(Math.abs(p.inProgressMock!.deadlineMs - expected)).toBeLessThan(3000);
});

test('remounting resumes the same questions, answers and remaining time (does not restart)', async () => {
  const store = newStore();
  const first = renderApp('/c/admin/mock', store);
  await start();
  await pick();
  const stem = screen.getByRole('group').textContent;
  const deadline = (await store.getProgress()).inProgressMock!.deadlineMs;
  first.unmount();
  cleanup();
  renderApp('/c/admin/mock', store);
  expect(await screen.findByLabelText(/time remaining/i)).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /start mock exam/i })).toBeNull();
  expect(screen.getByRole('group').textContent).toBe(stem);
  expect([...screen.queryAllByRole('radio'), ...screen.queryAllByRole('checkbox')].some((el) => (el as HTMLInputElement).checked)).toBe(true);
  expect((await store.getProgress()).inProgressMock!.deadlineMs).toBe(deadline);
});

test('when the deadline passes the exam auto-submits', async () => {
  const store = newStore();
  renderApp('/c/admin/mock', store);
  await start();
  const ip = (await store.getProgress()).inProgressMock!;
  cleanup();
  await store.saveInProgressMock({ ...ip, deadlineMs: Date.now() + 600 });
  renderApp('/c/admin/mock', store);
  expect(await screen.findByRole('heading', { name: /mock exam results/i }, { timeout: 4000 })).toBeInTheDocument();
  expect((await store.getProgress()).mockAttempts).toHaveLength(1);
});

test('an exam whose deadline passed while the tab was closed is submitted on return', async () => {
  const store = newStore();
  renderApp('/c/admin/mock', store);
  await start();
  const ip = (await store.getProgress()).inProgressMock!;
  cleanup();
  await store.saveInProgressMock({ ...ip, deadlineMs: Date.now() - 1000 });
  renderApp('/c/admin/mock', store);
  expect(await screen.findByRole('heading', { name: /mock exam results/i })).toBeInTheDocument();
});

test('no correctness feedback is visible before submit', async () => {
  renderApp('/c/admin/mock');
  await start();
  await pick();
  expect(screen.queryByRole('status')).toBeNull();
  expect(screen.queryByText(/^(correct|incorrect)$/i)).toBeNull();
});

test('review list shows answered, flagged and unanswered counts', async () => {
  const store = newStore();
  renderApp('/c/admin/mock', store);
  await start();
  const n = (await store.getProgress()).inProgressMock!.questionIds.length;
  await pick();
  await userEvent.click(screen.getByRole('button', { name: /^next$/i }));
  await userEvent.click(screen.getByRole('button', { name: /flag for review/i }));
  await userEvent.click(screen.getByRole('button', { name: /review & submit/i }));
  expect(screen.getByText(/^answered: 1$/i)).toBeInTheDocument();
  expect(screen.getByText(/^flagged: 1$/i)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`^unanswered: ${n - 1}$`, 'i'))).toBeInTheDocument();
});

test('submit with unanswered questions succeeds and results report unanswered', async () => {
  const store = newStore();
  renderApp('/c/admin/mock', store);
  await start();
  const n = (await store.getProgress()).inProgressMock!.questionIds.length;
  await userEvent.click(screen.getByRole('button', { name: /review & submit/i }));
  await userEvent.click(screen.getByRole('button', { name: /submit exam/i }));
  expect(await screen.findByRole('heading', { name: /mock exam results/i })).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`unanswered: ${n}`, 'i'))).toBeInTheDocument();
  expect(screen.getByText(/score: 0%/i)).toBeInTheDocument();
});

test('results show per-section percent and link the weakest section to its module', async () => {
  renderApp('/c/admin/mock');
  await start();
  await userEvent.click(screen.getByRole('button', { name: /review & submit/i }));
  await userEvent.click(screen.getByRole('button', { name: /submit exam/i }));
  await screen.findByRole('heading', { name: /mock exam results/i });
  expect(screen.getAllByText(/0%/).length).toBeGreaterThan(1);
  expect(screen.getByRole('link', { name: new RegExp(firstTitle) })).toBeInTheDocument();
});

test('partial mock shows the incomplete-bank banner on start and on results', async () => {
  renderApp('/c/admin/mock');
  expect(await screen.findByText(/preview mock/i)).toBeInTheDocument();
  await start();
  await userEvent.click(screen.getByRole('button', { name: /review & submit/i }));
  await userEvent.click(screen.getByRole('button', { name: /submit exam/i }));
  await screen.findByRole('heading', { name: /mock exam results/i });
  expect(screen.getByText(/preview mock/i)).toBeInTheDocument();
});

test('submitting clears the in-progress mock and records one attempt', async () => {
  const store = newStore();
  renderApp('/c/admin/mock', store);
  await start();
  await userEvent.click(screen.getByRole('button', { name: /review & submit/i }));
  await userEvent.click(screen.getByRole('button', { name: /submit exam/i }));
  await screen.findByRole('heading', { name: /mock exam results/i });
  const p = await store.getProgress();
  expect(p.inProgressMock).toBeNull();
  expect(p.mockAttempts).toHaveLength(1);
  expect(p.mockAttempts[0].partial).toBe(true);
});

test('results page for a missing attempt shows not found', async () => {
  renderApp('/c/admin/results/7');
  expect(await screen.findByText(/not found/i)).toBeInTheDocument();
});
