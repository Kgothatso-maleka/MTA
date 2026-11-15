import { act, screen } from '@testing-library/react';
import { LocalStorageStore } from '../storage/LocalStorageStore';
import { FakeStorage, renderApp } from '../test-utils';

class ThrowingStorage extends FakeStorage {
  setItem(): void {
    throw new DOMException('quota', 'QuotaExceededError');
  }
}

test('no storage warning while saving works', async () => {
  renderApp('/');
  expect(screen.queryByText(/will not be saved/i)).toBeNull();
});

test('the warning appears on any page as soon as a save fails, without a reload', async () => {
  const store = new LocalStorageStore(new ThrowingStorage());
  renderApp('/c/admin', store);
  expect(screen.queryByText(/will not be saved/i)).toBeNull();
  await act(async () => {
    await store.markLessonComplete('admin', 'objects-and-fields');
  });
  expect(await screen.findByText(/will not be saved/i)).toBeInTheDocument();
});
