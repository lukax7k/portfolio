import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaTruck, FaLock, FaDollarSign, FaCalendarCheck, FaThLarge } from "react-icons/fa";
import { FaToilet, FaChair, FaBed, FaCouch } from "react-icons/fa";
import { GiChest, GiCookingPot, GiMirrorMirror, GiWoodenCrate } from "react-icons/gi";
import { useSwipeable } from "react-swipeable";
import { useForm } from 'react-hook-form';
import { ModalRegister } from '../components/registerModal';
import { ModalLogin } from '../components/loginModal';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';




import heroImage from "../assets/store-hero.png";
import heroImage2 from "../assets/store-hero-2.png";
import heroImage3 from "../assets/store-hero-3.png";

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
import gabineteBanheiroImg from "../assets/products/gabineteBanheiroImg.png"
import espelhoRedondoImg from "../assets/products/espelhoRedondoImg.png"

import oferta1 from "../assets/oferta1.png";
import oferta2 from "../assets/oferta2.png";
import oferta3 from "../assets/oferta3.png";

type LojaUserForm = {
  name: string;
  password: string;
  endereco?: string;
};

type LoginFormData = {
  name: string;
  password: string;
};

type Produto = { nome: string; preco: number; categoria: string; img: string };
type Notificacao = { id: number; mensagem: string };

const StoreDemoPage = () => {
  const navigate = useNavigate();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [search,] = useState("");
  const [cart, setCart] = useState<Produto[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const form = useForm<LojaUserForm>();
  const Lform = useForm<LoginFormData>();





  // Função para abrir o modal
  const abrirModal = () => setIsModalOpen(true);

  // Função para fechar o modal
  const fecharModal = () => {
    setIsModalOpen(false);
    form.reset(); // opcional: limpa os campos
  };

  // Função para abrir o modal login
  const abrirLModal = () => setModalLoginOpen(true);

  // Função para fechar o modal login
  const fecharLModal = () => {
    setModalLoginOpen(false);
    form.reset(); // opcional: limpa os campos
  };

  // Estado para o carrossel - índice da imagem atual
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Ref para o intervalo do carrossel
  const intervaloRef = useRef<NodeJS.Timeout | null>(null);

  const handleRegistro = async (data: LojaUserForm) => {
    toast.promise(
      axios.post('https://api-users-1tzc.onrender.com/loja/users', data),
      {
        loading: 'Registrando usuário...',
        success: (res) => {
          localStorage.setItem('userId', res.data.id);
          fecharModal();
          return 'Usuário registrado com sucesso!';
        },
        error: 'Erro ao registrar usuário. Tente novamente.',
      }
    );
  };

  const handleLogin = async (data: LoginFormData) => {
    toast.promise(
      axios.post('https://api-users-1tzc.onrender.com/loja/login', data),
      {
        loading: 'Logando...',
        success: (res) => {
          localStorage.setItem('userId', res.data.id);
          fecharLModal();
          console.log(res.data.id);
          return 'Login realizado com sucesso!';
        },
        error: 'Erro ao logar com usuário. Tente novamente.',
      }
    );
  };

  const categorias = [
    { nome: "Todos", icone: <FaThLarge /> },
    { nome: "Banheiro", icone: <FaToilet /> },
    { nome: "Dormitório", icone: <FaBed /> },
    { nome: "Cadeiras", icone: <FaChair /> },
    { nome: "Armarios", icone: <GiChest /> },
    { nome: "Cozinha", icone: <GiCookingPot /> },
    { nome: "Espelhos", icone: <GiMirrorMirror /> },
    { nome: "Prateleiras", icone: <GiWoodenCrate /> },
    { nome: "Sofás", icone: <FaCouch /> },
  ];

  const produtos: Produto[] = [
    { nome: "Cadeira Moderna", preco: 299, categoria: "Cadeiras", img: cadeiraModernaImg },
    { nome: "Cadeira Elegante", preco: 349, categoria: "Cadeiras", img: cadeiraEleganteImg },
    { nome: "Poltrona Luxuosa", preco: 899, categoria: "Sofás", img: poltronaLuxuosaImg },
    { nome: "Mesa de Madeira", preco: 499, categoria: "Cozinha", img: mesaMadeiraImg },
    { nome: "Mesa Clássica", preco: 450, categoria: "Cozinha", img: mesaClassicaImg },
    { nome: "Escrivaninha Moderna", preco: 650, categoria: "Dormitório", img: escrivaninhaModernaImg },
    { nome: "Armário Minimalista", preco: 1200, categoria: "Armarios", img: armarioMinimalistaImg },
    { nome: "Estante Minimal", preco: 799, categoria: "Prateleiras", img: estanteMinimalImg },
    { nome: "Sofá Confort", preco: 1500, categoria: "Sofás", img: sofaConfortImg },
    { nome: "Sofá Aconchegante", preco: 1700, categoria: "Sofás", img: sofaAconcheganteImg },
    { nome: "Gabinete Suspenso com Cuba", preco: 1299, categoria: "Banheiro", img: gabineteBanheiroImg, },
    {
      nome: "Espelho Redondo com Moldura de Madeira",
      preco: 489,
      categoria: "Espelhos",
      img: espelhoRedondoImg,
    },


  ];

  const produtosFiltrados = produtos
    .filter(p => categoriaSelecionada === "Todos" || p.categoria === categoriaSelecionada)
    .filter(p => p.nome.toLowerCase().includes(search.toLowerCase()));

  const adicionarNotificacao = (mensagem: string) => {
    const id = Date.now() + Math.random();
    setNotificacoes(prev => [...prev, { id, mensagem }]);
    setTimeout(() => {
      setNotificacoes(prev => prev.filter(n => n.id !== id));
    }, 2000);
  };

  const adicionarAoCarrinho = (produto: Produto) => {
    setCart([...cart, produto]);
    adicionarNotificacao(`Produto adicionado ao carrinho!`);
  };

  const removerItem = (index: number) => {
    const novoCarrinho = [...cart];
    novoCarrinho.splice(index, 1);
    setCart(novoCarrinho);
  };

  const total = cart.reduce((acc, item) => acc + item.preco, 0);

  const formatarPreco = (valor: number) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Imagens do carrossel
  const heroImages = [
    heroImage,
    heroImage2,
    heroImage3,
  ];

  // Função que cria ou reseta o intervalo para troca automática do carrossel
  const resetIntervalo = () => {
    if (intervaloRef.current) clearInterval(intervaloRef.current);
    intervaloRef.current = setInterval(() => {
      setCurrentHeroIndex(prev =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
  };

  // Inicializa o intervalo na montagem
  useEffect(() => {
    resetIntervalo();
    // Limpa o intervalo ao desmontar o componente
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, []);

  // Funções para navegar no carrossel com reset do timer
  const prevHero = () => {
    setCurrentHeroIndex(prev => (prev === 0 ? heroImages.length - 1 : prev - 1));
    resetIntervalo();
  };

  const nextHero = () => {
    setCurrentHeroIndex(prev => (prev === heroImages.length - 1 ? 0 : prev + 1));
    resetIntervalo();
  };

  const goToHero = (idx: number) => {
    setCurrentHeroIndex(idx);
    resetIntervalo();
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextHero(),
    onSwipedRight: () => prevHero(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });


  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 60, // ou maior que o wrapper do modal
          },
        }}
      />
      <main className="font-sans bg-white text-gray-800">
        {/* Top Bar */}


        {/* Navbar */}
        <nav className="bg-white shadow py-4 px-6 flex items-center justify-between border-b sticky top-0 z-40">
          <div className="flex items-center gap-2">

            <span className="font-bold text-lg text-red-600">MóveisCasa</span>
          </div>

          <div className="flex gap-4 relative">
            <button onClick={() => setShowCart(true)} className="text-red-600 hover:text-red-800">
              <FaShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 right-7 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={abrirLModal} className="text-red-600 hover:text-red-800 transition">
              <FaUser size={22} />
            </button>

          </div>
        </nav>

        {/* Sessão de Categorias */}
        <section className="bg-black text-white flex justify-around items-center py-3 px-2 sticky top-[56px] z-50 overflow-x-auto">
          {categorias.map(({ nome, icone }) => (
            <button
              key={nome}
              onClick={() => setCategoriaSelecionada(nome)}
              className={`flex flex-col items-center text-xs min-w-[70px] px-2 py-1 rounded-md ${categoriaSelecionada === nome ? "bg-red-600" : "hover:bg-red-700"
                }`}
            >
              <div className="mb-1">{icone}</div>
              {nome}
            </button>
          ))}
        </section>

        {/* Hero - Carrossel com transição suave */}
        <section className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
          <div {...swipeHandlers} className="w-full h-full relative">
            {/* Imagens: vamos trocar por opacidade */}
            {heroImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Hero ${idx + 1}`}
                className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ${idx === currentHeroIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
              />
            ))}

            {/* Overlay preto */}
            <div className="absolute inset-0 bg-black opacity-50 z-20 " />

            {/* Texto do Hero - SEM animação, z-index maior que as imagens e overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:pl-20 text-white text-left pointer-events-none z-30">

              <h2 className="text-3xl md:text-5xl font-bold mb-2">NOVIDADE!</h2>
              <p className="text-lg md:text-xl font-medium mb-4">CONFIRA NOSSOS PRODUTOS</p>
              <span className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 text-base md:text-xl rounded-full w-max">
                A PARTIR DE: {formatarPreco(299)}
              </span>

            </div>

            {/* Botões do carrossel */}
            {/* Botões do carrossel */}
            <div className="hidden md:block">
              <button
                onClick={prevHero}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition z-30"
                aria-label="Imagem anterior"
              >
                &#8592;
              </button>
              <button
                onClick={nextHero}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition z-30"
                aria-label="Próxima imagem"
              >
                &#8594;
              </button>
            </div>


            {/* Indicadores */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToHero(idx)}
                  className={`w-3 h-3 rounded-full ${idx === currentHeroIndex ? "bg-red-600" : "bg-white bg-opacity-50"
                    }`}
                  aria-label={`Imagem ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Barra de Informações abaixo do Hero */}
        <section className="max-w-7xl mx-auto px-6 py-2  border-b">
          <button onClick={() => navigate("/")} className="text-red-600 font-medium hover:underline">
            ← Voltar
          </button>
        </section>
        <section className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-gray-600 text-sm border-b">


          <div className="flex items-center gap-2">
            <FaCalendarCheck className="text-red-600" />
            <div>
              <p className="font-semibold">Prazo de 30 dias</p>
              <p className="text-gray-500 text-xs">garantia de devolução do dinheiro</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaTruck className="text-red-600" />
            <div>
              <p className="font-semibold">Frete grátis</p>
              <p className="text-gray-500 text-xs">para compras acima de R$99</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaDollarSign className="text-red-600" />
            <div>
              <p className="font-semibold">Menor preço</p>
              <p className="text-gray-500 text-xs">garantia</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaLock className="text-red-600" />
            <div>
              <p className="font-semibold">Compra segura</p>
              <p className="text-gray-500 text-xs">garantia</p>
            </div>
          </div>
        </section>

        {/* Seção de Promoções */}
        <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Banner 1 */}
          <div className="relative group overflow-hidden rounded-lg shadow">
            <img
              src={oferta1}
              alt="Promoção 1"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-30 z-20" />
            <div className="absolute inset-0 flex flex-col justify-end text-left text-white p-4">
              <h3 className="text-3xl font-bold z-30">GRANDE PROMOÇÃO</h3>
              <p className="text-xl font-semibold z-30">50% DESCONTO</p>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative group overflow-hidden rounded-lg shadow">
            <img
              src={oferta2}
              alt="Promoção 2"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-30 z-20" />
            <div className="absolute inset-0 flex flex-col justify-end text-left text-white p-4">
              <h3 className="text-3xl font-bold z-30">OFERTA DE VERÃO</h3>
              <p className="text-xl font-semibold z-30">15% OFF EM TODOS ITENS</p>
            </div>
          </div>

          {/* Banner 3 */}
          <div className="relative group overflow-hidden rounded-lg shadow">
            <img
              src={oferta3}
              alt="Promoção 3"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-30 z-20" />
            <div className="absolute inset-0 flex flex-col justify-end text-left text-white p-4">
              <h3 className="text-3xl font-bold z-30">NOVOS ITENS</h3>
              <p className="text-xl font-semibold z-30">CHEGANDO</p>
            </div>
          </div>
        </section>


        {/* Produtos */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Produtos em Destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {produtosFiltrados.map(produto => (
              <div key={produto.nome} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                <img src={produto.img} alt={produto.nome} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{produto.nome}</h3>
                  <p className="text-red-600 font-bold mb-2">{formatarPreco(produto.preco)}</p>
                  <button
                    onClick={() => adicionarAoCarrinho(produto)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition w-full"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Carrinho */}
        {showCart && (
          <div className="fixed inset-0  z-50 flex justify-center items-center p-4">
            <div className="absolute inset-0 bg-black opacity-60" onClick={() => setShowCart(false)} />
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative z-60 overflow-y-auto max-h-[80vh]">
              <h3 className="text-xl font-semibold mb-4">Seu Carrinho</h3>
              {cart.length === 0 ? (
                <p>Carrinho vazio</p>
              ) : (
                <ul>
                  {cart.map((item, i) => (
                    <li key={i} className="flex justify-between items-center mb-3 border-b pb-2">
                      <div>
                        <p className="font-semibold">{item.nome}</p>
                        <p className="text-red-600">{formatarPreco(item.preco)}</p>
                      </div>
                      <button
                        onClick={() => removerItem(i)}
                        className="text-red-600 hover:text-red-800 transition"
                        aria-label={`Remover ${item.nome}`}
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 font-bold text-lg">Total: {formatarPreco(total)}</div>
              <button
                onClick={() => setShowCart(false)}
                className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-500 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        )}


        {/* Notificações - parte inferior central */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2">
          {notificacoes.map(({ id, mensagem }) => (
            <div
              key={id}
              className="bg-red-600 text-white text-sm px-1 py-3 rounded-lg shadow-lg animate-slide-up min-w-[220px] max-w-full text-center"
            >
              {mensagem}
            </div>

          ))}
        </div>

        {/* Footer */}
        <footer className="bg-gray-100 mt-12">

          <div className="text-center text-gray-500 text-xs py-4 border-t">
            © {new Date().getFullYear()} MóveisCasa. Todos os direitos reservados.
          </div>
        </footer>
        <ModalRegister<LojaUserForm>
          isOpen={isModalOpen}
          onClose={fecharModal}
          onSubmit={handleRegistro}
          form={form}
          abrirLModal={abrirLModal}
          title="Crie sua conta"
          submitText="Cadastrar"
          styleWrapper={{
            background: 'rgba(0,0,0,0.7)',
            zIndex: 50,
          }}
          styleContent={{
            background: '#fff',
            border: '2px solid #c30000',
            borderRadius: '12px',
            padding: '32px',
            fontFamily: 'Poppins, sans-serif',
            maxWidth: '400px',
            margin: '10px',
            width: '100%',
            boxSizing: 'border-box'
          }}
          styleTitle={{
            color: '#c30000',
            fontSize: '26px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
          styleButtonSubmit={{
            background: '#c30000',
            fontWeight: 'bold',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
          }}
        >
          {/* Nome e Senha lado a lado */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              gap: '12px',
              marginBottom: '16px',
              boxSizing: 'border-box',
            }}
          >
            <input
              {...form.register('name')}
              placeholder="Nome"
              style={{
                flex: 1,
                minWidth: 0,
                padding: '12px 20px',
                borderRadius: '24px',
                border: '1px solid #ccc',
                backgroundColor: '#f3f4f6',
                fontWeight: 'bold',
                boxSizing: 'border-box'
              }}
            />
            <input
              {...form.register('password')}
              type="password"
              placeholder="Senha"
              style={{
                flex: 1,
                minWidth: 0,
                padding: '12px 20px',
                borderRadius: '24px',
                border: '1px solid #ccc',
                backgroundColor: '#f3f4f6',
                fontWeight: 'bold',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Endereço abaixo */}
          <input
            {...form.register('endereco')}
            placeholder="Endereço"
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: '24px',
              border: '1px solid #ccc',
              backgroundColor: '#f3f4f6',
              marginBottom: '16px',
              fontWeight: 'bold',
              boxSizing: 'border-box'
            }}
          />
        </ModalRegister>

        <ModalLogin
          isOpen={modalLoginOpen}
          onClose={() => setModalLoginOpen(false)}
          form={Lform}
          onSubmit={handleLogin}
          abrirModal={abrirModal}
          title="Login"
          submitText="Logar"
          styleWrapper={{
            background: 'rgba(0,0,0,0.7)',
            zIndex: 50,
          }}
          styleContent={{
            background: '#fff',
            border: '2px solid #c30000',
            borderRadius: '12px',
            padding: '32px',
            fontFamily: 'Poppins, sans-serif',
            maxWidth: '400px',
            margin: '10px',
            width: '100%',
            boxSizing: 'border-box'
          }}
          styleTitle={{
            color: '#c30000',
            fontSize: '26px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
          styleButtonSubmit={{
            background: '#c30000',
            fontWeight: 'bold',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
          }}
        >
          {/* Nome e Senha lado a lado */}
          
            <input
              {...Lform.register('name')}
              placeholder="Nome"
              style={{
                flex: 1,
                minWidth: 0,
                padding: '12px 20px',
                borderRadius: '24px',
                border: '1px solid #ccc',
                backgroundColor: '#f3f4f6',
                fontWeight: 'bold',
                boxSizing: 'border-box'
              }}
            />
            <input
              {...Lform.register('password')}
              type="password"
              placeholder="Senha"
              style={{
                flex: 1,
                minWidth: 0,
                padding: '12px 20px',
                borderRadius: '24px',
                border: '1px solid #ccc',
                backgroundColor: '#f3f4f6',
                fontWeight: 'bold',
                boxSizing: 'border-box'
              }}
            />
         

        </ModalLogin>


      </main>
    </>
  );
};

export default StoreDemoPage;
