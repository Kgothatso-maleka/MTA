import { Link, Route, Routes } from 'react-router-dom';
import CoursePage from './pages/CoursePage';
import Home from './pages/Home';
import LessonPage from './pages/LessonPage';
import MockExam from './pages/MockExam';
import { usePersistent } from './storage/StoreContext';
import PracticeHub from './pages/PracticeHub';
import ProgressPage from './pages/ProgressPage';
import Results from './pages/Results';

export default function App() {
  const persistent = usePersistent();
  return (
    <div className="container">
      <header>
        <h1>
          <Link to="/" style={{ textDecoration: 'none' }}>
            Maleka Tech Academy
          </Link>
        </h1>
      </header>
      {!persistent && (
        <p className="banner" role="status">
          Your browser is blocking storage, so progress will not be saved when you close this page. Export it from My progress before leaving.
        </p>
      )}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/c/:courseId" element={<CoursePage />} />
          <Route path="/c/:courseId/m/:moduleId" element={<LessonPage />} />
          <Route path="/c/:courseId/practice" element={<PracticeHub />} />
          <Route path="/c/:courseId/mock" element={<MockExam />} />
          <Route path="/c/:courseId/results/:attemptIndex" element={<Results />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </div>
  );
}
