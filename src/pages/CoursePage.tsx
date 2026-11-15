import { Link, useParams } from 'react-router-dom';
import { loadCourse, loadModule } from '../content/loader';
import { useProgress } from '../storage/useProgress';
import type { Course } from '../types';
import NotFound from './NotFound';

function tryLoadCourse(id: string | undefined): Course | null {
  try {
    return id ? loadCourse(id) : null;
  } catch {
    return null;
  }
}

export default function CoursePage() {
  const { courseId } = useParams();
  const course = tryLoadCourse(courseId);
  const { progress } = useProgress();
  if (!course) return <NotFound what="Course" />;

  const done = new Set(progress.completedModules[course.id] ?? []);
  const modules = course.moduleIds.map((id) => loadModule(course.id, id).meta);
  const completed = modules.filter((m) => done.has(m.id)).length;
  const pct = modules.length === 0 ? 0 : Math.round((completed / modules.length) * 100);

  return (
    <section>
      <h2>{course.name}</h2>
      <div className="progress" role="progressbar" aria-label="Course progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <span style={{ width: `${pct}%` }} />
      </div>
      <p>{pct}% complete</p>
      <p>
        <Link to={`/c/${course.id}/practice`}>Practice</Link> · <Link to={`/c/${course.id}/mock`}>Mock exam</Link>
      </p>
      {course.exam.sections.map((section) => {
        const inSection = modules.filter((m) => m.examSection === section.id);
        return (
          <div className="panel" key={section.id}>
            <h3>
              {section.name} ({section.weight}%)
            </h3>
            {inSection.length === 0 ? (
              <p>Modules coming soon.</p>
            ) : (
              <ul>
                {inSection.map((m) => (
                  <li key={m.id}>
                    <Link to={`/c/${course.id}/m/${m.id}`}>{m.title}</Link>
                    {done.has(m.id) && <span> ✓ Completed</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </section>
  );
}
