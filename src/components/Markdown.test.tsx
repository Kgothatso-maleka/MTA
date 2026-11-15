import { render, screen } from '@testing-library/react';
import Markdown from './Markdown';

test.each([
  ['key-terms', 'Key terms'],
  ['exam-trap', 'Exam trap'],
  ['on-the-job', 'On the job'],
])('callout %s renders its label and content', (name, label) => {
  render(<Markdown source={`:::${name}\nHello **world**\n:::`} />);
  const aside = screen.getByText(label).closest('aside')!;
  expect(aside).toHaveClass('callout', name);
  expect(aside).toHaveTextContent('Hello world');
});

test('unknown directive name renders as plain text, no throw', () => {
  render(<Markdown source={':::mystery\nstill here\n:::'} />);
  expect(screen.getByText(/still here/)).toBeInTheDocument();
});

test('renders GFM tables and headings', () => {
  render(<Markdown source={'## Title\n\n| a | b |\n|---|---|\n| 1 | 2 |'} />);
  expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
  expect(screen.getByRole('table')).toBeInTheDocument();
});

test('raw HTML comments in lesson source are never shown to learners', () => {
  const { container } = render(<Markdown source={'Before\n\n<!-- verify: builder note -->\n\nAfter'} />);
  expect(container.textContent).not.toMatch(/verify|<!--|&lt;/);
  expect(container.textContent).toContain('After');
});
