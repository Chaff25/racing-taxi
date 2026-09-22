import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import PostsListPage from './pages/PostsListPage';
import PostNewPage from './pages/PostNewPage';
import PostViewPage from './pages/PostViewPage';
import DriftPage from './pages/DriftPage';
import TimeAttackPage from './pages/TimeAttackPage';
import ForzaPage from './pages/ForzaPage';

function App() {
  return (
    <>
      <Menu />
      <div className="page">
        <Routes>
          <Route path="/" element={<PostsListPage />} />
          <Route path="/posts/new" element={<PostNewPage />} />
          <Route path="/posts/:id" element={<PostViewPage />} />
          <Route path="/drift" element={<DriftPage />} />
          <Route path="/timeattack" element={<TimeAttackPage />} />
          <Route path="/forza" element={<ForzaPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;