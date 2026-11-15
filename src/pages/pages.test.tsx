import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp, newStore } from '../test-utils';
import { loadCourse, loadModule } from '../content/loader';

const course = loadCourse('admin');
const first = course.moduleIds[0];
const firstMeta = loadModule('admin', first).meta;

test('home lists the courses with a link to each', async () => {
  renderApp('/');
  expect(await screen.findByRole('link', { name: /salesforce administrator/i })).toHaveAttribute('href', '/c/admin');
});

test('course page groups modules under their exam section with the section weight shown', async () => {
  renderApp('/c/admin');
  const section = course.exam.sections.find((s) => s.id === firstMeta.examSection)!;
  expect(await screen.findByRole('heading', { name: new RegExp(`${section.name}.*${section.weight}%`) })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: new RegExp(firstMeta.title) })).toHaveAttribute('href', `/c/admin/m/${first}`);
});

test('completed modules show a done marker and the progress percentage', async () => {
  const store = newStore();
  await store.markLessonComplete('admin', first);
  renderApp('/c/admin', store);
  const expected = Math.round((1 / course.moduleIds.length) * 100);
  expect(await screen.findByText(`${expected}% complete`)).toBeInTheDocument();
  expect(screen.getByText(/✓ completed/i)).toBeInTheDocument();
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', String(expected));
});

test('lesson page shows video, rendered lesson, exercise section and a "Mark complete" button', async () => {
  renderApp(`/c/admin/m/${first}`);
  expect(await screen.findByRole('heading', { name: firstMeta.title, level: 1 })).toBeInTheDocument();
  expect(screen.getAllByText(/video coming soon/i).length).toBeGreaterThan(0);
  expect(screen.getByRole('heading', { name: /practice exercise/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /mark complete/i })).toBeInTheDocument();
});

test('Mark complete calls store.markLessonComplete', async () => {
  const store = newStore();
  const spy = vi.spyOn(store, 'markLessonComplete');
  renderApp(`/c/admin/m/${first}`, store);
  await userEvent.click(await screen.findByRole('button', { name: /mark complete/i }));
  expect(spy).toHaveBeenCalledWith('admin', first);
  await waitFor(() => expect(screen.getByText(/completed/i)).toBeInTheDocument());
});

test('unknown course or module id shows a not-found message', async () => {
  renderApp('/c/nope');
  expect(await screen.findByText(/not found/i)).toBeInTheDocument();
});

test('unknown module id shows a not-found message', async () => {
  renderApp('/c/admin/m/nope');
  expect(await screen.findByText(/not found/i)).toBeInTheDocument();
});
