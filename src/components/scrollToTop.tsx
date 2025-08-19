// ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Faz scroll para o topo toda vez que a rota mudar
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null; // Esse componente não renderiza nada
};

export default ScrollToTop;
