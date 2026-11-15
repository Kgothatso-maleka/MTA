import { useEffect, useRef, useState } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');

/** Derives remaining time from an absolute deadline, so refresh or a backgrounded tab never resets it. */
export default function Timer({ deadlineMs, onExpire }: { deadlineMs: number; onExpire: () => void }) {
  const [now, setNow] = useState(() => Date.now());
  const fired = useRef(false);
  const cb = useRef(onExpire);
  cb.current = onExpire;

  useEffect(() => {
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (t >= deadlineMs && !fired.current) {
        fired.current = true;
        cb.current();
      }
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [deadlineMs]);

  const secs = Math.max(0, Math.ceil((deadlineMs - now) / 1000));
  return (
    <span aria-label="Time remaining" role="timer">
      {pad(Math.floor(secs / 60))}:{pad(secs % 60)}
    </span>
  );
}
