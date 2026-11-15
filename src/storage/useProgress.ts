import { useCallback, useEffect, useState } from 'react';
import { emptyProgress, type Progress } from './ProgressStore';
import { useStore } from './StoreContext';

export function useProgress(): { progress: Progress; loaded: boolean; refresh: () => Promise<void> } {
  const store = useStore();
  const [progress, setProgress] = useState<Progress>(emptyProgress());
  const [loaded, setLoaded] = useState(false);
  const refresh = useCallback(async () => {
    setProgress(await store.getProgress());
    setLoaded(true);
  }, [store]);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  return { progress, loaded, refresh };
}
