import { Link, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>
          <Link to="/" style={{ textDecoration: 'none' }}>
            Maleka Tech Academy
          </Link>
        </h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<p>Salesforce exam prep and job-ready skills.</p>} />
        </Routes>
      </main>
    </div>
  );
}
