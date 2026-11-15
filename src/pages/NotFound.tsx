import { Link } from 'react-router-dom';

export default function NotFound({ what }: { what: string }) {
  return (
    <div className="panel">
      <p>{what} not found.</p>
      <Link to="/">Back to courses</Link>
    </div>
  );
}
