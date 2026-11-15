import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { newStore, renderApp } from '../test-utils';

vi.mock('../content/loader', async (orig) => {
  const real = await orig<typeof import('../content/loader')>();
  return { ...real, loadQuestions: (c: string, m?: string) => real.loadQuestions(c, m).slice(0, 20) };
});

test('an incomplete bank shows the preview banner and records a partial attempt', async () => {
  const store = newStore();
  renderApp('/c/admin/mock', store);
  expect(await screen.findByText(/preview mock/i)).toBeInTheDocument();
  await userEvent.click(await screen.findByRole('button', { name: /start mock exam/i }));
  await userEvent.click(screen.getByRole('button', { name: /review & submit/i }));
  await userEvent.click(screen.getByRole('button', { name: /submit exam/i }));
  await screen.findByRole('heading', { name: /mock exam results/i });
  expect(screen.getByText(/preview mock/i)).toBeInTheDocument();
  expect((await store.getProgress()).mockAttempts[0].partial).toBe(true);
});
