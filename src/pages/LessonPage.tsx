import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Markdown from '../components/Markdown';
import VideoEmbed from '../components/VideoEmbed';
import QuizSession from '../components/QuizSession';
import { loadModule, loadQuestions, type LoadedModule } from '../content/loader';
import { useStore } from '../storage/StoreContext';
import { useProgress } from '../storage/useProgress';
import NotFound from './NotFound';

function tryLoad(courseId?: string, moduleId?: string): LoadedModule | null {
  try {
    return courseId && moduleId ? loadModule(courseId, moduleId) : null;
  } catch {
    return null;
  }
}

export default function LessonPage() {
  const { courseId, moduleId } = useParams();
  const store = useStore();
  const { progress, refresh } = useProgress();
  const [busy, setBusy] = useState(false);
  const mod = tryLoad(courseId, moduleId);
  if (!mod || !courseId || !moduleId) return <NotFound what="Lesson" />;

  const questions = loadQuestions(courseId, moduleId);
  const done = (progress.completedModules[courseId] ?? []).includes(moduleId);
  const complete = async () => {
    setBusy(true);
    await store.markLessonComplete(courseId, moduleId);
    await refresh();
    setBusy(false);
  };

  return (
    <article>
      <p>
        <Link to={`/c/${courseId}`}>← Back to course</Link>
      </p>
      <h1>{mod.meta.title}</h1>
      <VideoEmbed youtubeId={mod.meta.youtubeId} title={mod.meta.title} />
      {mod.meta.objectives.length > 0 && (
        <div className="panel">
          <strong>You will learn</strong>
          <ul>
            {mod.meta.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      )}
      <Markdown source={mod.lesson} />
      {mod.exercise !== null && (
        <section>
          <h2>Practice exercise</h2>
          <VideoEmbed
            youtubeId={mod.exerciseVideo.youtubeId}
            title={`${mod.meta.title} exercise walkthrough`}
            startSeconds={mod.exerciseVideo.startSeconds}
          />
          <Markdown source={mod.exercise} />
        </section>
      )}
      {questions.length > 0 && (
        <section>
          <h2>Check your understanding</h2>
          <QuizSession courseId={courseId} moduleId={moduleId} questions={questions} mode="check" limit={8} />
        </section>
      )}
      {done ? <p>✓ Completed</p> : <button onClick={complete} disabled={busy}>Mark complete</button>}
    </article>
  );
}
