// src/pages/CardapioPage.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import burguer1 from "../assets/burguer1.png";
import burguer2 from "../assets/burguer2.png";
import burguer3 from "../assets/burguer3.png";
import fries1 from "../assets/fries1.png";
import fries2 from "../assets/fries2.png";
import fries3 from "../assets/fries3.png";
import soda from "../assets/soda.png";
import juice from "../assets/juice.png";

type ItemCardapio = {
  nome: string;
  preco: string;
  descricao?: string;
  imagem: string;
};

const CardapioPage = () => {
  const navigate = useNavigate();

  const [itemSelecionado, setItemSelecionado] = useState<ItemCardapio | null>(null);

  const abrirModal = (item: ItemCardapio) => {
    setItemSelecionado(item);
  };

  const fecharModal = () => setItemSelecionado(null);

  const cardapio: Record<string, ItemCardapio[]> = {
    Lanches: [
      {
        nome: "Burger One",
        preco: "R$ 18,00",
        descricao: "Pão com gergelim, burger bovino 70g, 2 queijos e ketchup.",
        imagem: burguer1,
      },
      {
        nome: "Burger Two",
        preco: "R$ 25,00",
        descricao: "Pão com gergelim, burger bovino 100g, 4 queijos e ketchup.",
        imagem: burguer2,
      },
      {
        nome: "Burger Super",
        preco: "R$ 30,00",
        descricao: "Pão com gergelim, burger bovino 100g, 4 queijos e ketchup.",
        imagem: burguer3,
      },
    ],
    Porções: [
      {
        nome: "Batata Frita 250g",
        preco: "R$ 9,00",
        imagem: fries1,
      },
      {
        nome: "Batata Frita 500g",
        preco: "R$ 15,00",
        imagem: fries2,
      },
      {
        nome: "Batata c/ Bacon",
        preco: "R$ 18,00",
        imagem: fries3,
      },
    ],
    Bebidas: [
      {
        nome: "Refrigerante 350ml",
        preco: "R$ 5,00",
        imagem: soda,
      },
      {
        nome: "Suco Lata 350ml",
        preco: "R$ 7,00",
        imagem: juice,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-orange-900 text-white font-sans px-4 py-6">
      {/* Botão Voltar */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-yellow-400 hover:underline text-sm"
        >
          ← Voltar
        </button>
      </div>

      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-yellow-400 tracking-wide">🍔 CARDÁPIO</h1>
        <p className="text-sm text-orange-200 mt-1">📞 Delivery: (11) 90000-0001</p>
      </header>

      {/* Cardápio */}
      <section className="max-w-2xl mx-auto space-y-10">
        {Object.entries(cardapio).map(([secao, itens]) => (
          <div
            key={secao}
            className="bg-white/5 border-l-4 border-yellow-400 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-bold text-yellow-300 mb-4 uppercase tracking-wider">
              {secao}
            </h2>
            <ul className="space-y-4">
              {itens.map((item, index) => (
                <li key={index}>
                  <div className="flex items-start gap-4 border-b border-yellow-400/30 pb-4">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="w-16 h-16 object-cover rounded shadow cursor-pointer"
                      onClick={() => abrirModal(item)}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{item.nome}</span>
                        <span className="text-sm text-yellow-200">{item.preco}</span>
                      </div>
                      {item.descricao && (
                        <p className="text-sm text-gray-300 mt-1">{item.descricao}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Modal de Imagem com Zoom */}
      {itemSelecionado && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={fecharModal}
        >
          <div
            className="bg-white text-black p-6 rounded-lg max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={fecharModal}
              className="absolute top-2 right-2 text-black text-2xl font-bold"
            >
              ×
            </button>
            <img
              src={itemSelecionado.imagem}
              alt={itemSelecionado.nome}
              className="w-full max-h-[80vh] object-contain rounded mb-4"
            />

            <h3 className="text-xl font-bold mb-2">{itemSelecionado.nome}</h3>
            {itemSelecionado.descricao && (
              <p className="text-gray-700">{itemSelecionado.descricao}</p>
            )}
          </div>
        </div>
      )}

      {/* Rodapé */}
      <footer className="mt-16 text-center text-sm text-yellow-100">
        <p className="mb-2">Obrigado pela preferência! 🍽️</p>
        <div className="flex items-center justify-center gap-3 text-yellow-300">
          <span className="font-semibold">Siga nas redes:</span>
          <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition">📸</a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition">📘</a>
        </div>
      </footer>
    </main>
  );
};

export default CardapioPage;
