import { Link } from 'react-router-dom';
import { listCourses } from '../content/loader';

export default function Home() {
  const courses = listCourses();
  return (
    <section>
      <p>Salesforce exam prep and job-ready skills.</p>
      <h2>Courses</h2>
      <ul>
        {courses.map((c) => (
          <li key={c.id}>
            <Link to={`/c/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link to="/progress">My progress</Link>
      </p>
    </section>
  );
}
