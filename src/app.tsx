import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/scrollToTop';
import Home from './pages/home';
import ProjectPage from './pages/projectPage';
import StoreDemoPage from './pages/houseStore';
import CardapioPage from './pages/cardapio';
import BlogPage from './pages/blog';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projeto/:id" element={<ProjectPage />} />
        <Route path="/projeto/1" element={<StoreDemoPage />} />
        <Route path="/projeto/2" element={<CardapioPage />} />
        <Route path="/projeto/3" element={<BlogPage />} />
      </Routes>
    </>
  );
}

export default App;
