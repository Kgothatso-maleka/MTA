import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuizRunner from './QuizRunner';
import type { Question } from '../types';

const names = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo'];
const mk = (id: string, type: 'single' | 'multi', correct: string[]): Question => ({
  id, moduleId: 'm', examSection: 's', objective: 'o', type, stem: `Stem ${id}`,
  options: names.map((n, i) => ({ id: `o${i}`, text: n })), correct,
  explanation: `Because ${id}`, difficulty: 1, tags: [],
});
const single = mk('q1', 'single', ['o0']);
const multi = mk('q2', 'multi', ['o1', 'o3']);

const inputs = () => [...screen.queryAllByRole('radio'), ...screen.queryAllByRole('checkbox')];
const labels = () => inputs().map((el) => el.closest('label')!.textContent);

test('option order is stable for a given seed and differs for another seed', () => {
  const a1 = render(<QuizRunner questions={[single]} seed={11} mode="practice" onFinish={() => {}} />);
  const first = labels();
  a1.unmount();
  const a2 = render(<QuizRunner questions={[single]} seed={11} mode="practice" onFinish={() => {}} />);
  expect(labels()).toEqual(first);
  a2.unmount();
  render(<QuizRunner questions={[single]} seed={12} mode="practice" onFinish={() => {}} />);
  expect(labels()).not.toEqual(first);
});

test('single shows radios', () => {
  render(<QuizRunner questions={[single]} seed={1} mode="practice" onFinish={() => {}} />);
  expect(screen.getAllByRole('radio')).toHaveLength(5);
});

test('multi shows checkboxes with the "Choose 2" hint', () => {
  render(<QuizRunner questions={[multi]} seed={1} mode="practice" onFinish={() => {}} />);
  expect(screen.getAllByRole('checkbox')).toHaveLength(5);
  expect(screen.getByText(/choose 2/i)).toBeInTheDocument();
});

test('a question with no selection cannot be submitted', () => {
  render(<QuizRunner questions={[single]} seed={1} mode="practice" onFinish={() => {}} />);
  expect(screen.getByRole('button', { name: /submit answer/i })).toBeDisabled();
});

test('answering shows correct/incorrect and the explanation', async () => {
  render(<QuizRunner questions={[single]} seed={1} mode="practice" onFinish={() => {}} />);
  await userEvent.click(screen.getByLabelText('Bravo'));
  await userEvent.click(screen.getByRole('button', { name: /submit answer/i }));
  expect(screen.getByText(/incorrect/i)).toBeInTheDocument();
  expect(screen.getByText('Because q1')).toBeInTheDocument();
});

test('a correct multi answer shows Correct', async () => {
  render(<QuizRunner questions={[multi]} seed={1} mode="practice" onFinish={() => {}} />);
  await userEvent.click(screen.getByLabelText('Bravo'));
  await userEvent.click(screen.getByLabelText('Delta'));
  await userEvent.click(screen.getByRole('button', { name: /submit answer/i }));
  expect(screen.getByText(/^correct/i)).toBeInTheDocument();
});

test('finish calls onFinish with all answers', async () => {
  const onFinish = vi.fn();
  render(<QuizRunner questions={[single, multi]} seed={3} mode="check" onFinish={onFinish} />);
  for (let i = 0; i < 2; i++) {
    const isMulti = screen.queryAllByRole('checkbox').length > 0;
    if (isMulti) {
      await userEvent.click(screen.getByLabelText('Bravo'));
      await userEvent.click(screen.getByLabelText('Delta'));
    } else {
      await userEvent.click(screen.getByLabelText('Alpha'));
    }
    await userEvent.click(screen.getByRole('button', { name: /submit answer/i }));
    await userEvent.click(screen.getByRole('button', { name: /next|finish/i }));
  }
  expect(onFinish).toHaveBeenCalledTimes(1);
  expect(onFinish).toHaveBeenCalledWith({ q1: ['o0'], q2: expect.arrayContaining(['o1', 'o3']) });
});

test('empty question list renders a friendly message and never throws', () => {
  render(<QuizRunner questions={[]} seed={1} mode="practice" onFinish={() => {}} />);
  expect(screen.getByText(/no questions/i)).toBeInTheDocument();
});
