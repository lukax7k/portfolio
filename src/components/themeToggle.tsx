import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false); // Evita renderizações incorretas antes do `useEffect`

  // Detectar tema salvo ou preferência do sistema ao montar o componente
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialIsDark = saved ? saved === "dark" : prefersDark;

    setIsDark(initialIsDark);

    if (initialIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setMounted(true);
  }, []);

  // Atualizar HTML e localStorage quando `isDark` mudar
  useEffect(() => {
    if (!mounted) return;

    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, mounted]);

  if (!mounted) return null; // Evita piscar tema errado no SSR

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      aria-label="Alternar entre modo claro e escuro"
      className="p-2 rounded-full bg-gray-700 dark:bg-white text-blue-300 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      {isDark ? (
        <img src="/sun.svg" alt="Modo claro" className="w-6 h-6" />
      ) : (
        <img src="/moon.svg" alt="Modo escuro" className="w-6 h-6" />
      )}
    </button>
  );
}
