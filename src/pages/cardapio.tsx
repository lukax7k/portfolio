// src/pages/CardapioPage.tsx
import { useNavigate } from "react-router-dom";

const CardapioPage = () => {
  const navigate = useNavigate();

  const cardapio = {
    Simples: [
      { nome: "Top Burger Especial", preco: "R$ 20,00" },
      { nome: "Cheese Burger Especial", preco: "R$ 22,50" },
      { nome: "Salada Burger Completo", preco: "R$ 21,50" },
    ],
    principal: [
      { nome: "Duplo Salada Simples", preco: "R$ 25,00" },
      { nome: "Duplo Salada Especial", preco: "R$ 28,50" },
      { nome: "Duplo Cheese Burger", preco: "R$ 27,50" },
      { nome: "Duplo Cheese Burger Especial", preco: "R$ 32,50" },
    ],
    Especiais: [
      { nome: "Duplo Picanha Gourmet", preco: "R$ 44,00" },
      { nome: "Cheese Costela Burger", preco: "R$ 38,50" },
      { nome: "Salada Burger Gourmet", preco: "R$ 36,50" },
      { nome: "Salada Gourmet Especial", preco: "R$ 40,50" },
    ],
    bebidas: [
      { nome: "Refrigerante", preco: "R$ 8,00" },
      { nome: "Suco Natural", preco: "R$ 10,50" },
      { nome: "Água com e sem gás", preco: "R$ 5,00" },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-700 to-yellow-600 text-white font-sans p-6">
      
      {/* Botão Voltar */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:underline text-sm"
        >
          ← Voltar
        </button>
      </div>

      {/* Header do restaurante */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-1">🍴 Meu Restaurante</h1>
        <p className="text-sm text-orange-200">📞 Entregas: (12) 3456-7890</p>
      </header>

      {/* Seções do cardápio */}
      <section className="max-w-md mx-auto space-y-10">
        {/* Seção genérica */}
        {Object.entries(cardapio).map(([secao, itens]) => (
          <div key={secao}>
            <h2 className="text-xl font-semibold border-b border-orange-300 mb-4 capitalize">
              {secao}
            </h2>
            <ul className="space-y-2">
              {itens.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b border-white/20 pb-1"
                >
                  <span>{item.nome}</span>
                  <span className="text-sm text-orange-100">{item.preco}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Rodapé opcional */}
      <footer className="mt-16 text-center text-sm text-orange-100">
        Obrigado pela preferência! 🍽️
      </footer>
    </main>
  );
};

export default CardapioPage;
