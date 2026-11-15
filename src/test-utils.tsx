import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import App from './App';
import { LocalStorageStore } from './storage/LocalStorageStore';
import { StoreProvider } from './storage/StoreContext';

export class FakeStorage implements Storage {
  data = new Map<string, string>();
  get length() { return this.data.size; }
  clear() { this.data.clear(); }
  getItem(k: string) { return this.data.has(k) ? this.data.get(k)! : null; }
  key(i: number) { return [...this.data.keys()][i] ?? null; }
  removeItem(k: string) { this.data.delete(k); }
  setItem(k: string, v: string) { this.data.set(k, v); }
}

export const newStore = () => new LocalStorageStore(new FakeStorage());

/** Renders the whole app at `route` with an isolated progress store. */
export function renderApp(route: string, store = newStore()) {
  return { store, ...render(<StoreProvider store={store}><MemoryRouter initialEntries={[route]}><App /></MemoryRouter></StoreProvider>) };
}

export function renderWith(ui: ReactElement, store = newStore()) {
  return { store, ...render(<StoreProvider store={store}><MemoryRouter>{ui}</MemoryRouter></StoreProvider>) };
}
