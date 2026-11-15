import { render, screen } from '@testing-library/react';
import Timer from './Timer';

test('shows remaining time as mm:ss, allowing minutes above 59', () => {
  render(<Timer deadlineMs={Date.now() + 105 * 60000} onExpire={() => {}} />);
  expect(screen.getByLabelText(/time remaining/i).textContent).toMatch(/^(105:00|104:5\d)$/);
});

test('calls onExpire exactly once when the deadline has passed', async () => {
  const onExpire = vi.fn();
  render(<Timer deadlineMs={Date.now() + 300} onExpire={onExpire} />);
  await vi.waitFor(() => expect(onExpire).toHaveBeenCalled(), { timeout: 3000 });
  await new Promise((r) => setTimeout(r, 600));
  expect(onExpire).toHaveBeenCalledTimes(1);
});

test('an already-passed deadline expires immediately and shows 00:00', async () => {
  const onExpire = vi.fn();
  render(<Timer deadlineMs={Date.now() - 5000} onExpire={onExpire} />);
  await vi.waitFor(() => expect(onExpire).toHaveBeenCalledTimes(1));
  expect(screen.getByLabelText(/time remaining/i).textContent).toBe('00:00');
});
