import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import type { ProgressStore } from './ProgressStore';

const Ctx = createContext<ProgressStore | null>(null);

export function StoreProvider({ store, children }: { store: ProgressStore; children: ReactNode }) {
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore(): ProgressStore {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside <StoreProvider>');
  return s;
}

/** True while progress can be saved. Re-renders when saving starts failing; safe outside a provider. */
export function usePersistent(): boolean {
  const store = useContext(Ctx);
  const [, bump] = useReducer((n: number) => n + 1, 0);
  useEffect(() => store?.subscribe?.(bump), [store]);
  return store ? store.persistent : true;
}
