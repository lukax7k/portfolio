import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/store-hero.png"; // imagem de fundo
import { FaShoppingCart, FaSearch, FaTrash } from "react-icons/fa";

// Importe as imagens dos produtos da pasta assets/products 
import cadeiraModernaImg from "../assets/products/cadeira-moderna.png";
import cadeiraEleganteImg from "../assets/products/cadeira-elegante.png";
import poltronaLuxuosaImg from "../assets/products/poltrona-luxuosa.png";
import mesaMadeiraImg from "../assets/products/mesa-madeira.png";
import mesaClassicaImg from "../assets/products/mesa-classica.png";
import escrivaninhaModernaImg from "../assets/products/escrivaninha-moderna.png";
import armarioMinimalistaImg from "../assets/products/armario-minimalista.png";
import estanteMinimalImg from "../assets/products/estante-minimal.png";
import sofaConfortImg from "../assets/products/sofa-confort.png";
import sofaAconcheganteImg from "../assets/products/sofa-aconchegante.png";

type Produto = { nome: string; preco: number; categoria: string; img: string };
type Notificacao = { id: number; mensagem: string };

const StoreDemoPage = () => {
  const navigate = useNavigate();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Produto[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showSaibaMais, setShowSaibaMais] = useState(false);

  // Agora notificações são múltiplas
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  const categorias = ["Todas", "Cadeiras", "Mesas", "Armários", "Sofás"];

  const produtos: Produto[] = [
    { nome: "Cadeira Moderna", preco: 399, categoria: "Cadeiras", img: cadeiraModernaImg },
    { nome: "Cadeira Elegante", preco: 499, categoria: "Cadeiras", img: cadeiraEleganteImg },
    { nome: "Poltrona Luxuosa", preco: 699, categoria: "Cadeiras", img: poltronaLuxuosaImg },
    { nome: "Mesa de Madeira", preco: 1299, categoria: "Mesas", img: mesaMadeiraImg },
    { nome: "Mesa Clássica", preco: 1199, categoria: "Mesas", img: mesaClassicaImg },
    { nome: "Escrivaninha Moderna", preco: 1099, categoria: "Mesas", img: escrivaninhaModernaImg },
    { nome: "Armário Minimalista", preco: 799, categoria: "Armários", img: armarioMinimalistaImg },
    { nome: "Estante Minimal", preco: 899, categoria: "Armários", img: estanteMinimalImg },
    { nome: "Sofá Confort", preco: 2499, categoria: "Sofás", img: sofaConfortImg },
    { nome: "Sofá Aconchegante", preco: 2199, categoria: "Sofás", img: sofaAconcheganteImg },
  ];

  const produtosFiltrados = produtos
    .filter((p) =>
      categoriaSelecionada === "Todas" ? true : p.categoria === categoriaSelecionada
    )
    .filter((p) =>
      p.nome.toLowerCase().includes(search.toLowerCase())
    );

  // Função para adicionar notificações
  const adicionarNotificacao = (mensagem: string) => {
    const id = Date.now() + Math.random(); // id único
    setNotificacoes((prev) => [...prev, { id, mensagem }]);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
      setNotificacoes((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const adicionarAoCarrinho = (produto: Produto) => {
    setCart([...cart, produto]);
    adicionarNotificacao(`Produto "${produto.nome}" adicionado ao carrinho!`);
  };

  const removerItem = (index: number) => {
    const novoCarrinho = [...cart];
    novoCarrinho.splice(index, 1);
    setCart(novoCarrinho);
  };

  const total = cart.reduce((acc, item) => acc + item.preco, 0);

  return (
    <main className="min-h-screen bg-yellow-50 font-sans text-gray-900">
      {/* HERO */}
      <div
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 flex flex-col justify-center px-8 h-full">
          <h1 className="text-4xl font-extrabold text-white mb-3 max-w-2xl">
            Móveis que combinam com o seu estilo de vida
          </h1>
          <p className="text-white mb-6 max-w-md">
            Descubra móveis projetados para complementar seu espaço e estilo.
          </p>
          <button
            className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow hover:bg-yellow-600 transition w-max"
            onClick={() => setShowSaibaMais(true)}
          >
            Saiba Mais
          </button>
        </div>
      </div>

      {/* TOPO: voltar + busca + carrinho */}
      {/* Desktop layout original */}
      <div className="hidden md:flex max-w-6xl mx-auto p-4 items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-yellow-700 font-medium hover:underline">
          ← Voltar
        </button>

        <div className="relative w-1/2">
          <span className="absolute inset-y-0 left-3 flex items-center text-yellow-700">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Buscar produto..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="relative text-yellow-800"
          onClick={() => setShowCart(true)}
          aria-label="Abrir carrinho"
        >
          <FaShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile layout customizado */}
      <div className="md:hidden max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-yellow-700 font-medium hover:underline"
          >
            ← Voltar
          </button>
          <button
            className="relative text-yellow-800"
            onClick={() => setShowCart(true)}
            aria-label="Abrir carrinho"
          >
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-3 flex items-center text-yellow-700">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Buscar produto..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* CATEGORIAS */}
      <section className="max-w-6xl mx-auto px-4 mb-10">
        <h2 className="text-xl font-semibold mb-4">Compre por Categoria</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button
            onClick={() => setCategoriaSelecionada("Todas")}
            className={`rounded-lg px-4 py-2 font-medium shadow transition col-span-2 md:col-span-1 ${categoriaSelecionada === "Todas"
              ? "bg-yellow-600 text-white"
              : "bg-white text-yellow-700 hover:bg-yellow-100"
              }`}
          >
            Todas
          </button>
          {categorias
            .filter((cat) => cat !== "Todas")
            .map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSelecionada(cat)}
                className={`rounded-lg px-4 py-2 font-medium shadow transition ${categoriaSelecionada === cat
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-yellow-700 hover:bg-yellow-100"
                  }`}
              >
                {cat}
              </button>
            ))}
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="max-w-6xl mx-auto px-4 mb-24">
        <h2 className="text-xl font-semibold mb-6">
          {categoriaSelecionada === "Todas"
            ? "Todos os Produtos"
            : `Categoria: ${categoriaSelecionada}`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.nome}
              className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
            >
              <img
                src={produto.img}
                alt={produto.nome}
                className="h-40 w-full object-cover rounded mb-4"
              />
              <p className="text-lg font-semibold mb-3">
                R$ {produto.preco.toFixed(2)}
              </p>
              <button
                onClick={() => adicionarAoCarrinho(produto)}
                className="bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 transition"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL DO CARRINHO */}
      {showCart && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="bg-yellow-50 max-w-md w-full rounded-xl shadow-xl p-6 relative border border-yellow-200 max-h-[80vh] overflow-auto">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowCart(false)}
            >
              ✖
            </button>
            <h3 className="text-xl font-bold text-yellow-800 mb-4 border-b pb-2 border-yellow-300">
              Seu Carrinho
            </h3>
            {cart.length === 0 ? (
              <p className="text-gray-700">Seu carrinho está vazio.</p>
            ) : (
              <>
                <ul className="space-y-2 mb-4 text-sm">
                  {cart.map((item, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center text-yellow-900"
                    >
                      <span>{item.nome}</span>
                      <div className="flex items-center gap-2">
                        <span>R$ {item.preco.toFixed(2)}</span>
                        <button
                          onClick={() => removerItem(i)}
                          className="text-red-500 hover:text-red-700"
                          title="Remover"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="text-right font-semibold text-lg text-yellow-800 border-t pt-2 border-yellow-300">
                  Total: R$ {total.toFixed(2)}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODAL SAIBA MAIS */}
      {showSaibaMais && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowSaibaMais(false)}
        >
          <div
            className="bg-white max-w-lg w-full rounded-xl shadow-xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowSaibaMais(false)}
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold mb-4 text-yellow-800">Saiba Mais</h3>
            <p className="text-gray-700">
              Aqui você pode colocar informações adicionais sobre sua loja, promoções,
              novidades ou qualquer conteúdo que deseje destacar.
            </p>
          </div>
        </div>
      )}

      {/* NOTIFICAÇÕES (múltiplas) */}
      <div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 space-y-2 z-50 max-w-xs md:max-w-sm"
        style={{ pointerEvents: "none" }}
      >
        {notificacoes.map((notificacao) => (
          <div
            key={notificacao.id}
            className={`bg-yellow-600 text-white rounded shadow-lg animate-fadeInOut
    px-4 py-2 text-sm md:px-5 md:py-3 md:text-base whitespace-nowrap`}
          >
            Produto adicionado ao carrinho!
          </div>

        ))}
      </div>

      {/* Estilos customizados */}
      <style>{`
  @keyframes fadeInOut {
    0%, 100% { opacity: 0; transform: translateY(10px); }
    10%, 90% { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeInOut {
    animation: fadeInOut 3s ease forwards;
  }
  /* Ajuste responsivo para notificação no mobile */
@media (max-width: 768px) {
  div.fixed.bottom-4.left-1/2 {
    max-width: 90vw; /* Aumenta largura para quase toda a tela */
    font-size: 0.75rem; /* fonte menor */
    padding: 0.25rem 0.75rem; /* padding lateral um pouco maior */
    border-radius: 0.5rem;
    white-space: nowrap; /* força o texto ficar em uma linha */
  }
}

`}</style>

    </main>
  );
};

export default StoreDemoPage;
