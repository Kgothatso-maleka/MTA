import { createContext, useContext, type ReactNode } from 'react';
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
