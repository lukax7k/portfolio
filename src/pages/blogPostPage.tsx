import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";
import blog3 from "../assets/blog3.png";
import blog4 from "../assets/blog4.png";
import blog5 from "../assets/blog5.png";
import blog6 from "../assets/blog6.png";

// Base de posts sincronizada com BlogPage.tsx
const postsData = [
  {
    id: 1,
    titulo: "Crie seu blog ou página de notícias do seu jeito",
    autor: "Marco António",
    data: "18 de Agosto de 2025",
    imagem: blog1,
    conteudo:
      "Esse post explora como você pode criar uma página de blog com estilo moderno e flexível. Aprenda a destacar conteúdos com boa estrutura visual.",
    categoria: "Design",
  },
  {
    id: 2,
    titulo: "Desenvolva suas ideias agora",
    autor: "Ana Silva",
    data: "12 de Agosto de 2025",
    imagem: blog2,
    conteudo:
      "Tire suas ideias do papel com técnicas criativas e planejamento. Neste post, compartilhamos como iniciar novos projetos pessoais ou profissionais.",
    categoria: "Inspiração",
  },
  {
    id: 3,
    titulo: "Postagem de blog exemplo com estilo simples",
    autor: "Lucas Moura",
    data: "05 de Agosto de 2025",
    imagem: blog3,
    conteudo:
      "Menos é mais: neste post mostramos como um blog minimalista pode valorizar seu conteúdo e melhorar a experiência do leitor.",
    categoria: "Técnico",
  },
  {
    id: 4,
    titulo: "Como criar um portfólio incrível",
    autor: "Juliana Pires",
    data: "01 de Agosto de 2025",
    imagem: blog4,
    conteudo:
      "Seu portfólio é seu cartão de visita digital. Aprenda a apresentar seus trabalhos de forma impactante e bem organizada.",
    categoria: "Design",
  },
  {
    id: 5,
    titulo: "A importância do design responsivo",
    autor: "Roberto Lima",
    data: "28 de Julho de 2025",
    imagem: blog5,
    conteudo:
      "Garantir que seu site funcione em todos os dispositivos não é opcional — é essencial. Saiba como aplicar responsividade desde o início.",
    categoria: "Técnico",
  },
  {
    id: 6,
    titulo: "Tendências de UI/UX para 2025",
    autor: "Fernanda Torres",
    data: "20 de Julho de 2025",
    imagem: blog6,
    conteudo:
      "Design centrado no usuário é o futuro. Descubra o que vem por aí em experiências digitais e como aplicar essas tendências no seu projeto.",
    categoria: "Inspiração",
  },
];

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = postsData.find((p) => p.id === Number(id));

  const [curtidas, setCurtidas] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [darkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  if (!post) return <div className="p-6 text-red-500">Post não encontrado.</div>;

  return (
    <main
      className={`min-h-screen font-sans transition-colors duration-300 ${
        darkMode ? "bg-slate-900 text-white" : "bg-blue-50 text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto p-6">
        {/* Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-cyan-400 hover:underline mb-4"
        >
          ← Voltar
        </button>

        {/* Post */}
        <article className={`${darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-800"
        } rounded-xl p-6 shadow`}>
          <img
            src={post.imagem}
            alt={post.titulo}
            className="w-full h-60 object-cover rounded mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{post.titulo}</h1>
          <p className="text-sm text-cyan-300 mb-4">
            ✍️ {post.autor} • {post.data}
          </p>

          {/* Curtidas */}
          <button
            onClick={() => setCurtidas(curtidas + 1)}
            className="text-pink-500 font-semibold mb-4"
          >
            ❤️ {curtidas}
          </button>

          {/* Conteúdo */}
          <p className="text-lg leading-relaxed">{post.conteudo}</p>
        </article>

        {/* Comentários */}
        <section className={`mt-10 ${darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-800"} rounded-xl p-6 shadow`}>
          <h2 className="text-xl font-semibold mb-4">Comentários</h2>
          {comments.length === 0 && <p className="text-sm text-gray-400 mb-4">Nenhum comentário ainda.</p>}
          <ul className="space-y-3 mb-4">
            {comments.map((c, i) => (
              <li
                key={i}
                className={`${darkMode ? "bg-slate-700 text-white" : "bg-gray-100 text-gray-800"} border-white/10 rounded p-3`}
              >
                {c}
              </li>
            ))}
          </ul>

          <textarea
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            placeholder="Escreva um comentário..."
            className={`w-full p-2 border rounded mb-3 ${darkMode ? "bg-slate-800 text-white" : "bg-white text-gray-800"}`}
          />
          <button
            onClick={() => {
              if (novoComentario.trim()) {
                setComments([novoComentario, ...comments]);
                setNovoComentario("");
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Comentar
          </button>
        </section>
      </div>
    </main>
  );
};

export default BlogPostPage;
