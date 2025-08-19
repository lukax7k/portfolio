import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StoreDemoPage = () => {
  const navigate = useNavigate();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  const categorias = ["Todas", "Cadeiras", "Mesas", "Armários", "Sofás"];

  const produtos = [
    { nome: "Cadeira Moderna", preco: "R$ 399,00", categoria: "Cadeiras" },
    { nome: "Cadeira Elegante", preco: "R$ 499,00", categoria: "Cadeiras" },
    { nome: "Poltrona Luxuosa", preco: "R$ 699,00", categoria: "Cadeiras" },

    { nome: "Mesa de Madeira", preco: "R$ 1.299,00", categoria: "Mesas" },
    { nome: "Mesa Clássica", preco: "R$ 1.199,00", categoria: "Mesas" },
    { nome: "Escrivaninha Moderna", preco: "R$ 1.099,00", categoria: "Mesas" },

    { nome: "Armário Minimalista", preco: "R$ 799,00", categoria: "Armários" },
    { nome: "Estante Minimal", preco: "R$ 899,00", categoria: "Armários" },

    { nome: "Sofá Confort", preco: "R$ 2.499,00", categoria: "Sofás" },
    { nome: "Sofá Aconchegante", preco: "R$ 2.199,00", categoria: "Sofás" },
  ];

  const produtosFiltrados =
    categoriaSelecionada === "Todas"
      ? produtos
      : produtos.filter((p) => p.categoria === categoriaSelecionada);

  return (
    <main className="min-h-screen bg-yellow-100 p-8 font-sans text-gray-900">

      {/* Botão Voltar */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-yellow-700 font-medium hover:underline flex items-center"
        >
          ← Voltar
        </button>
      </div>

      {/* HERO */}
      <header className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold mb-3 text-yellow-700">
          Móveis que combinam<br /> com o seu estilo de vida
        </h1>
        <p className="text-gray-700 mb-6 max-w-lg">
          Descubra móveis projetados para complementar seu espaço e estilo.
        </p>
        <button className="bg-yellow-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-yellow-700 transition">
          Saiba Mais
        </button>
      </header>

      {/* COMPRE POR CATEGORIA */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-xl font-semibold mb-6">Compre por Categoria</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaSelecionada(categoria)}
              className={`rounded-lg px-4 py-3 font-medium shadow-md hover:shadow-lg transition
                ${
                  categoriaSelecionada === categoria
                    ? "bg-yellow-600 text-white"
                    : "bg-white text-yellow-700"
                }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUTOS FILTRADOS */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-xl font-semibold mb-6">
          {categoriaSelecionada === "Todas"
            ? "Todos os Produtos"
            : `Categoria: ${categoriaSelecionada}`}
        </h2>
        {produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {produtosFiltrados.map(({ nome, preco }) => (
              <div
                key={nome}
                className="bg-white rounded-xl shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition"
              >
                <div className="h-40 bg-yellow-200 rounded-lg mb-4 flex items-center justify-center text-xl font-semibold text-yellow-700">
                  {nome}
                </div>
                <p className="text-lg font-semibold mb-3">{preco}</p>
                <button className="bg-yellow-600 text-white px-5 py-2 rounded-full hover:bg-yellow-700 transition">
                  Comprar
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Nenhum produto encontrado para esta categoria.</p>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-yellow-600 text-white text-center py-8 rounded-lg shadow-md max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold mb-3">Entre em contato</h2>
        <p>📧 contato@lojademoveis.com</p>
        <p>📱 (99) 99999-9999</p>
      </footer>
    </main>
  );
};

export default StoreDemoPage;
