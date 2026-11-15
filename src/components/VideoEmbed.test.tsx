import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoEmbed from './VideoEmbed';

const ID = 'dQw4w9WgXcQ';

test('with an id shows a thumbnail button and no iframe until clicked', () => {
  const { container } = render(<VideoEmbed youtubeId={ID} title="Intro" />);
  expect(screen.getByRole('button', { name: /play video: intro/i })).toBeInTheDocument();
  expect(container.querySelector('iframe')).toBeNull();
});

test('clicking inserts an iframe whose src starts with the nocookie embed url', async () => {
  const { container } = render(<VideoEmbed youtubeId={ID} title="Intro" />);
  await userEvent.click(screen.getByRole('button', { name: /play video/i }));
  const src = container.querySelector('iframe')!.getAttribute('src')!;
  expect(src.startsWith(`https://www.youtube-nocookie.com/embed/${ID}`)).toBe(true);
});

test('startSeconds adds ?start=', async () => {
  const { container } = render(<VideoEmbed youtubeId={ID} title="Intro" startSeconds={90} />);
  await userEvent.click(screen.getByRole('button', { name: /play video/i }));
  expect(container.querySelector('iframe')!.getAttribute('src')).toContain('start=90');
});

test('an "Open on YouTube" link is always present when an id exists', () => {
  render(<VideoEmbed youtubeId={ID} title="Intro" />);
  expect(screen.getByRole('link', { name: /open on youtube/i })).toHaveAttribute('href', expect.stringContaining(ID));
});

test.each([null, '', 'short', 'has spaces!!'])('id %j renders "Video coming soon" and no iframe', (id) => {
  const { container } = render(<VideoEmbed youtubeId={id as string | null} title="Intro" />);
  expect(screen.getByText(/video coming soon/i)).toBeInTheDocument();
  expect(container.querySelector('iframe')).toBeNull();
});
