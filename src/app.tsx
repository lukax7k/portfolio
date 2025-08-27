import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/scrollToTop';
import Home from './pages/home';
import StoreDemoPage from './pages/houseStore';
import CardapioPage from './pages/cardapio';
import BlogPage from './pages/blogPage';
import BlogPostPage from './pages/blogPostPage';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projeto/1" element={<StoreDemoPage />} />
        <Route path="/projeto/2" element={<CardapioPage />} />
        <Route path="/projeto/3" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
      </Routes>
    </>
  );
}

export default App;
