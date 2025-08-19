// src/pages/BlogPage.tsx
import { useNavigate } from "react-router-dom";
import blog1 from "../assets/blog1.png"
import blog2 from "../assets/blog2.png"
import blog3 from "../assets/blog3.png"

const BlogPage = () => {
  const navigate = useNavigate();

  const posts = [
    {
      id: 1,
      titulo: "Crie seu blog ou pagina de notícias do seu jeito",
      autor: "Marco António",
      data: "18 de Agosto de 2025",
      imagem: blog1,
      resumo:
        "Um texto leve e estilizado com foco em um layout moderno, perfeito para blog pessoal ou profissional.",
    },
    {
      id: 2,
      titulo: "Desenvolva suas ideias agora",
      imagem: blog2,
    },
    {
      id: 3,
      titulo: "Postagem de blog exemplo com estilo simples",
      imagem: blog3,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b shadow-sm px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">BLOG</h1>
        <nav className="flex flex-wrap gap-3 text-sm text-gray-600">
          <a href="#" className="text-cyan-600 font-semibold">
            Início
          </a>
          <a href="#">Estilo de Post</a>
          <a href="#">Destaques</a>
          <a href="#">Páginas</a>
          <a href="#">Categorias</a>
        </nav>
      </header>

      {/* Botão Voltar */}
      <div className="px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-cyan-600 hover:underline"
        >
          ← Voltar
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 py-4 max-w-6xl mx-auto">
        {/* Post em destaque */}
        <article className="lg:col-span-2 bg-white rounded shadow p-4">
          <img
            src={posts[0].imagem}
            alt={posts[0].titulo}
            className="w-full h-64 object-cover rounded"
          />
          <h2 className="text-2xl font-semibold mt-4">{posts[0].titulo}</h2>
          <p className="text-sm text-gray-500 mb-2">
            ✍️ {posts[0].autor} • {posts[0].data}
          </p>
          <p className="text-gray-700">{posts[0].resumo}</p>
        </article>

        {/* Posts recentes */}
        <aside className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-bold mb-4">Posts Recentes</h3>
          <div className="space-y-4">
            {posts.slice(1).map((post) => (
              <div key={post.id} className="flex items-center gap-3">
                <img
                  src={post.imagem}
                  alt={post.titulo}
                  className="w-16 h-16 object-cover rounded"
                />
                <p className="text-sm font-medium">{post.titulo}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Rodapé */}
      <footer className="text-center text-sm text-gray-500 py-6">
        © 2025 Meu Blog. Todos os direitos reservados.
      </footer>
    </main>
  );
};

export default BlogPage;
