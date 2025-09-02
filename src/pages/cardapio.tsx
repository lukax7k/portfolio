// src/pages/CardapioPage.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";


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
  promocao?: boolean;
  maisVendido?: boolean;
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
        maisVendido: true,
      },
      {
        nome: "Burger Two",
        preco: "R$ 25,00",
        descricao: "Pão com gergelim, burger bovino 100g, 4 queijos e ketchup.",
        imagem: burguer2,
        promocao: true,
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
        promocao: true,
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
        maisVendido: true,
      },
    ],
    Bebidas: [
      {
        nome: "Refrigerante 350ml",
        preco: "R$ 5,00",
        imagem: soda,
      },
      {
        nome: "Suco 350ml",
        preco: "R$ 7,00",
        imagem: juice,
        promocao: true,
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
        {Object.entries(cardapio).map(([secao, itens], index) => (
          <motion.div
  key={secao}
  className="bg-white/5 border-l-4 border-yellow-400 p-6 rounded-xl shadow-md"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: index * 0.2 }}
>

            <h2 className="text-2xl font-bold text-yellow-300 mb-4 uppercase tracking-wider">
              {secao}
            </h2>
            <ul className="space-y-4">
              {itens.map((item, index) => (
                <motion.li
  key={index}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>

                  <div className="flex items-start gap-4 border-b border-yellow-400/30 pb-4 transition-transform duration-300">
                    <div className="relative w-16 h-16">
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="w-full h-full object-cover rounded shadow cursor-pointer"
                        onClick={() => abrirModal(item)}
                      />

                      {item.promocao && (
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
                          Promoção
                        </span>
                      )}
                      {item.maisVendido && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
                          +Vendido
                        </span>
                      )}
                    </div>


                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{item.nome}</span>
                        <div className="text-right">
                          {item.promocao ? (
                            <>
                              <span className="text-sm text-gray-400 line-through block">
                                {item.preco}
                              </span>
                              <span className="text-sm text-yellow-300 font-semibold">
                                {/* Preço promocional hardcoded ou calculado */}
                                R$ {(Number(item.preco.replace(/\D/g, "")) * 0.8 / 100).toFixed(2).replace(".", ",")}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm text-yellow-200">{item.preco}</span>
                          )}
                        </div>
                      </div>
                      {item.descricao && (
                        <p className="text-sm text-gray-300 mt-1">{item.descricao}</p>
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>

          </motion.div>
        ))}
      </section>

      {/* Modal de Imagem com Zoom */}
      {itemSelecionado && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={fecharModal}
        >
          <div
            className="bg-zinc-900 text-white p-6 mx-6 rounded-lg max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={itemSelecionado.imagem}
              alt={itemSelecionado.nome}
              className="w-full max-h-[80vh] object-contain rounded mb-4"
            />

            <h3 className="text-xl font-bold mb-2">{itemSelecionado.nome}</h3>
            {itemSelecionado.descricao && (
              <p className="text-white">{itemSelecionado.descricao}</p>
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
