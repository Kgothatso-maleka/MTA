import { useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../storage/StoreContext';
import { useProgress } from '../storage/useProgress';

function readText(file: File): Promise<string> {
  if (typeof file.text === 'function') return file.text();
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsText(file);
  });
}

export default function ProgressPage() {
  const store = useStore();
  const { progress, loaded, refresh } = useProgress();
  const [error, setError] = useState<string | null>(null);

  const exportProgress = async () => {
    const json = await store.exportAll();
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mta-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProgress = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      await store.importAll(await readText(file));
      setError(null);
      await refresh();
    } catch {
      setError('Import failed: that file is not valid MTA progress data. Your current progress was not changed.');
    }
  };

  if (!loaded) return <p>Loading…</p>;
  const lessons = Object.values(progress.completedModules).reduce((n, l) => n + l.length, 0);
  const attempts = [...progress.mockAttempts].sort((a, b) => b.takenAt - a.takenAt);

  return (
    <section>
      <p><Link to="/">← Back to courses</Link></p>
      <h2>My progress</h2>
      <p className="banner">Your progress is stored only in this browser. Export it to keep a backup or move to another device.</p>
      <p>Completed lessons: {lessons}</p>
      <h3>Mock exams</h3>
      {attempts.length === 0 ? (
        <p>No mock exams taken yet.</p>
      ) : (
        <ul>
          {attempts.map((a) => (
            <li key={`${a.courseId}-${a.takenAt}`}>
              {new Date(a.takenAt).toLocaleString()} · {a.courseId} · {a.percent}% · {a.passed ? 'Passed' : 'Not passed'}
              {a.partial ? ' (preview mock)' : ''}
            </li>
          ))}
        </ul>
      )}
      <p>
        <button onClick={() => void exportProgress()}>Export progress</button>
      </p>
      <p>
        <label>
          Import progress <input type="file" accept="application/json,.json" onChange={(e) => void importProgress(e)} />
        </label>
      </p>
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
