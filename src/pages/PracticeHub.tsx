import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QuizSession from '../components/QuizSession';
import { loadCourse, loadModule, loadQuestions } from '../content/loader';
import type { Course, Question } from '../types';
import NotFound from './NotFound';

interface Selection {
  id: string;
  label: string;
  questions: Question[];
}

function tryLoadCourse(id?: string): Course | null {
  try {
    return id ? loadCourse(id) : null;
  } catch {
    return null;
  }
}

export default function PracticeHub() {
  const { courseId } = useParams();
  const course = tryLoadCourse(courseId);
  const [sel, setSel] = useState<Selection | null>(null);
  const bank = useMemo(() => (course ? loadQuestions(course.id) : []), [course]);
  if (!course) return <NotFound what="Course" />;

  const modules = course.moduleIds.map((id) => loadModule(course.id, id).meta);
  const options: Selection[] = [
    ...modules
      .map((m) => ({ id: m.id, label: `Module: ${m.title}`, questions: bank.filter((q) => q.moduleId === m.id) }))
      .filter((o) => o.questions.length > 0),
    ...course.exam.sections
      .map((s) => ({ id: `section:${s.id}`, label: `Section: ${s.name}`, questions: bank.filter((q) => q.examSection === s.id) }))
      .filter((o) => o.questions.length > 0),
  ];

  return (
    <section>
      <p>
        <Link to={`/c/${course.id}`}>← Back to course</Link>
      </p>
      <h2>Practice</h2>
      {sel ? (
        <>
          <p>{sel.label}</p>
          <QuizSession courseId={course.id} moduleId={sel.id} questions={sel.questions} mode="practice" limit={10} />
          <button className="secondary" onClick={() => setSel(null)}>Choose something else</button>
        </>
      ) : (
        <div>
          {options.length === 0 && <p>No questions available yet.</p>}
          {options.map((o) => (
            <p key={o.id}>
              <button className="secondary" onClick={() => setSel(o)}>{o.label}</button>
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
