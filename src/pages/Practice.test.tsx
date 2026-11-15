import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp, newStore } from '../test-utils';
import { loadCourse, loadModule } from '../content/loader';

const course = loadCourse('admin');
const first = course.moduleIds[0];
const title = loadModule('admin', first).meta.title;

test('practice hub lists modules and sections to practise', async () => {
  renderApp('/c/admin/practice');
  expect(await screen.findByRole('heading', { name: /practice/i, level: 2 })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: new RegExp(`module: ${title}`, 'i') })).toBeInTheDocument();
});

test('starting module practice shows a question and saving a finished run records a quiz attempt', async () => {
  const store = newStore();
  const spy = vi.spyOn(store, 'saveQuizAttempt');
  renderApp('/c/admin/practice', store);
  await userEvent.click(await screen.findByRole('button', { name: new RegExp(`module: ${title}`, 'i') }));
  // answer whatever is shown, then finish
  for (let i = 0; i < 40; i++) {
    const submit = screen.queryByRole('button', { name: /submit answer/i });
    if (!submit) break;
    await userEvent.click([...screen.queryAllByRole('radio'), ...screen.queryAllByRole('checkbox')][0]);
    await userEvent.click(submit);
    await userEvent.click(screen.getByRole('button', { name: /next|finish/i }));
  }
  await waitFor(() => expect(spy).toHaveBeenCalledTimes(1));
  expect(spy.mock.calls[0][0]).toMatchObject({ courseId: 'admin', moduleId: first });
  expect(await screen.findByText(/you scored/i)).toBeInTheDocument();
});

test('lesson page shows a check-your-understanding quiz when the module has questions', async () => {
  renderApp(`/c/admin/m/${first}`);
  expect(await screen.findByRole('heading', { name: /check your understanding/i })).toBeInTheDocument();
});
