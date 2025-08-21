import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";
import blog3 from "../assets/blog3.png";
import blog4 from "../assets/blog4.png";
import blog5 from "../assets/blog5.png";
import blog6 from "../assets/blog6.png";

const BlogPage = () => {
  const navigate = useNavigate();

  const postsData = [
    {
      id: 1,
      titulo: "Crie seu blog ou página de notícias do seu jeito",
      autor: "Marco António",
      data: "18 de Agosto de 2025",
      imagem: blog1,
      resumo:
        "Um texto leve e estilizado com foco em um layout moderno, perfeito para blog pessoal ou profissional.",
      categoria: "Design",
    },
    {
      id: 2,
      titulo: "Desenvolva suas ideias agora",
      autor: "Ana Silva",
      data: "12 de Agosto de 2025",
      imagem: blog2,
      resumo: "Motivação e técnicas para tirar suas ideias do papel.",
      categoria: "Inspiração",
    },
    {
      id: 3,
      titulo: "Postagem de blog exemplo com estilo simples",
      autor: "Lucas Moura",
      data: "05 de Agosto de 2025",
      imagem: blog3,
      resumo: "Como manter um blog minimalista focado no conteúdo.",
      categoria: "Técnico",
    },
    {
      id: 4,
      titulo: "Como criar um portfólio incrível",
      autor: "Juliana Pires",
      data: "01 de Agosto de 2025",
      imagem: blog4,
      resumo:
        "Dicas práticas para montar um portfólio que chama atenção no mercado digital.",
      categoria: "Design",
    },
    {
      id: 5,
      titulo: "A importância do design responsivo",
      autor: "Roberto Lima",
      data: "28 de Julho de 2025",
      imagem: blog5,
      resumo:
        "Entenda por que seu site precisa funcionar bem em todos os dispositivos.",
      categoria: "Técnico",
    },
    {
      id: 6,
      titulo: "Tendências de UI/UX para 2025",
      autor: "Fernanda Torres",
      data: "20 de Julho de 2025",
      imagem: blog6,
      resumo:
        "Explore as novas direções criativas para experiências digitais mais intuitivas.",
      categoria: "Inspiração",
    },
  ];

  const [posts] = useState(postsData);
  const [search, setSearch] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.titulo
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      !filtroCategoria || post.categoria === filtroCategoria;
    return matchesSearch && matchesCategory;
  });

  const categorias = Array.from(new Set(posts.map((p) => p.categoria)));

  return (
    <main
      className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-800"
        }`}
    >
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          📰 BLOG
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 border rounded text-sm hover:bg-white/10"
        >
          {darkMode ? "Modo Claro" : "Modo Escuro"}
        </button>
      </header>


      {/* Botão Voltar */}
      <div className="px-6">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-cyan-500 hover:underline mb-4"
        >
          ← Voltar
        </button>
      </div>

      {/* Filtros */}
      <section className="px-6 py-4 space-y-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`flex-1 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 ${darkMode
                ? "bg-slate-800 text-white border border-slate-600"
                : "bg-white text-black border border-gray-300"
              }`}
          />
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className={`p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 ${darkMode
                ? "bg-slate-800 text-white border border-slate-600"
                : "bg-white text-black border border-gray-300"
              }`}
          >
            <option value="">Todas as categorias</option>
            {categorias.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Posts */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-6 max-w-7xl mx-auto">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => navigate(`/blog/${post.id}`)}
            className={`cursor-pointer border rounded-xl shadow hover:shadow-2xl transition duration-300 overflow-hidden ${darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-200"
              }`}
          >
            <img
              src={post.imagem}
              alt={post.titulo}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-bold mb-1">{post.titulo}</h2>
              <p
                className={`text-sm mb-2 ${darkMode ? "text-cyan-300" : "text-cyan-600"
                  }`}
              >
                ✍️ {post.autor} • {post.data}
              </p>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                {post.resumo}
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* Footer */}
      <footer
        className={`text-center text-sm py-6 ${darkMode ? "text-gray-400" : "text-gray-500"
          }`}
      >
        © 2025 Meu Blog. Todos os direitos reservados.
      </footer>
    </main>
  );
};

export default BlogPage;
