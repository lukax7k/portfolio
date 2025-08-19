import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // Estado inicial baseado no localStorage OU preferência do sistema
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Sempre que mudar, aplica classe no HTML e salva no localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      aria-label="Alternar tema"
      className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
    >
      {isDark ? "🌞" : "🌙"}
    </button>
  );
}
