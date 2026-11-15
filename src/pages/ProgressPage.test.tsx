import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { newStore, renderApp } from '../test-utils';
import type { MockAttempt } from '../storage/ProgressStore';

const attempt: MockAttempt = {
  courseId: 'admin', seed: 1, questionIds: ['q1'], answers: {}, percent: 72.5, passed: true, partial: false,
  bySection: {}, takenAt: new Date('2026-11-15T10:00:00Z').getTime(),
};

test('page lists mock attempts with date, score and passed state', async () => {
  const store = newStore();
  await store.saveMockAttempt(attempt);
  await store.saveMockAttempt({ ...attempt, percent: 40, passed: false, takenAt: attempt.takenAt + 1000 });
  renderApp('/progress', store);
  expect(await screen.findByText(/72\.5%/)).toBeInTheDocument();
  expect(screen.getByText(/40%/)).toBeInTheDocument();
  expect(screen.getAllByText(/passed/i).length).toBeGreaterThanOrEqual(2);
  expect(screen.getByText(/not passed/i)).toBeInTheDocument();
});

test('shows how many lessons are completed', async () => {
  const store = newStore();
  await store.markLessonComplete('admin', 'objects-and-fields');
  renderApp('/progress', store);
  expect(await screen.findByText(/completed lessons: 1/i)).toBeInTheDocument();
});

test('shows a notice that progress is stored only in this browser', async () => {
  renderApp('/progress');
  expect(await screen.findByText(/stored only in this browser/i)).toBeInTheDocument();
});

test('when store.persistent is false a banner says progress will not be saved', async () => {
  const store = newStore();
  store.persistent = false;
  renderApp('/progress', store);
  expect(await screen.findByText(/will not be saved/i)).toBeInTheDocument();
});

test('export triggers a download of mta-progress.json containing the progress', async () => {
  const store = newStore();
  await store.markLessonComplete('admin', 'objects-and-fields');
  let blob: Blob | undefined;
  URL.createObjectURL = vi.fn((b: Blob | MediaSource) => {
    blob = b as Blob;
    return 'blob:test';
  });
  URL.revokeObjectURL = vi.fn();
  const clicks: string[] = [];
  const spy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
    clicks.push(this.download);
  });
  renderApp('/progress', store);
  await userEvent.click(await screen.findByRole('button', { name: /export progress/i }));
  await waitFor(() => expect(clicks).toEqual(['mta-progress.json']));
  expect(JSON.parse(await blob!.text()).completedModules.admin).toEqual(['objects-and-fields']);
  spy.mockRestore();
});

test('importing a valid file updates the displayed progress', async () => {
  const other = newStore();
  await other.markLessonComplete('admin', 'a');
  await other.markLessonComplete('admin', 'b');
  const file = new File([await other.exportAll()], 'mta-progress.json', { type: 'application/json' });
  renderApp('/progress');
  await userEvent.upload(await screen.findByLabelText(/import progress/i), file);
  expect(await screen.findByText(/completed lessons: 2/i)).toBeInTheDocument();
});

test('importing an invalid file shows an error and keeps current progress', async () => {
  const store = newStore();
  await store.markLessonComplete('admin', 'a');
  const file = new File(['this is not json'], 'bad.json', { type: 'application/json' });
  renderApp('/progress', store);
  await userEvent.upload(await screen.findByLabelText(/import progress/i), file);
  expect(await screen.findByRole('alert')).toHaveTextContent(/import failed/i);
  expect(screen.getByText(/completed lessons: 1/i)).toBeInTheDocument();
  expect((await store.getProgress()).completedModules.admin).toEqual(['a']);
});
