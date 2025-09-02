import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaRegHeart, FaFilter, FaTimes } from "react-icons/fa";
import destaqueImg from "../assets/hero-house.png";
import background from '../assets/backgroundBuild.png';


// Tipos
type Status = "Novo" | "Usado" | "Em Construção";
type Finalidade = "Comprar" | "Alugar";

type Imovel = {
  id: number;
  titulo: string;
  preco: number;
  endereco: string;
  cidade: string;
  bairro: string;
  tipo: string;
  area: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  finalidade: Finalidade;
  imagem: string;
  status: Status;
  amenidades: string[];
};

// Dados fixos
const statusPossiveis: Status[] = ["Novo", "Usado", "Em Construção"];
const amenidadesPossiveis = [
  "Piscina",
  "Academia",
  "Churrasqueira",
  "Playground",
  "Elevador",
  "Portaria 24h",
];

// Gerar imóveis fake
const imoveisData: Imovel[] = Array.from({ length: 50 }, (_, i) => {
  const status = statusPossiveis[i % statusPossiveis.length];
  const amenidades = amenidadesPossiveis.filter((_, idx) => i % (idx + 2) === 0);
  const cidade = ["São Paulo", "Rio de Janeiro", "Curitiba", "Florianópolis"][i % 4];
  const bairros = {
    "São Paulo": "Jardins",
    "Rio de Janeiro": "Copacabana",
    "Curitiba": "Santa Felicidade",
    "Florianópolis": "Centro",
  };
  return {
    id: i + 1,
    titulo: `Imóvel ${i + 1}`,
    preco: 1000 + i * 10000,
    endereco: `Rua ${i + 1}`,
    cidade,
    bairro: bairros[cidade as keyof typeof bairros],
    tipo: ["Casa", "Apartamento", "Cobertura"][i % 3],
    area: 100 + i * 5,
    quartos: (i % 5) + 1,
    banheiros: (i % 3) + 1,
    vagas: (i % 3) + 1,
    finalidade: i % 2 === 0 ? "Comprar" : "Alugar",
    imagem: `/imovel${(i % 4) + 1}.png`,
    status,
    amenidades,
  };
});

// Filtros possíveis
const tipos = ["Todos", "Casa", "Apartamento", "Cobertura"];
const quartos = ["Qualquer", "1", "2", "3", "4", "5+"];
const cidadesUnicas = ["Todas", ...new Set(imoveisData.map((i) => i.cidade))];
const finalidades = ["Todos", "Comprar", "Alugar"];
const statusFiltros = ["Todos", ...statusPossiveis];
const amenidadesFiltros = amenidadesPossiveis;

const RealEstatePage = () => {
  const [busca, setBusca] = useState("");
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState("Todos");
  const [cidadeSelecionada, setCidadeSelecionada] = useState("Todas");
  const [bairroSelecionado, setBairroSelecionado] = useState("Todos");
  const [quartosSelecionados, setQuartosSelecionados] = useState("Qualquer");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [finalidadeSelecionada, setFinalidadeSelecionada] = useState("Todos");
  const [statusSelecionado, setStatusSelecionado] = useState("Todos");
  const [amenidadesSelecionadas, setAmenidadesSelecionadas] = useState<string[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const imoveisContainerRef = useRef<HTMLDivElement>(null);
  const OFFSET = 1000;

  // Estado para mostrar/esconder filtros mobile
  const [mostrarFiltrosMobile, setMostrarFiltrosMobile] = useState(false);

  // Estado para detectar se está no desktop
  const [, setIsDesktop] = useState(window.innerWidth >= 768);

  const navigate = useNavigate();
  const itensPorPagina = 15;

  // Atualiza isDesktop e mostrarFiltrosMobile conforme o tamanho da tela
  useEffect(() => {
    const handleResize = () => {
  const desktop = window.innerWidth >= 768;
  setIsDesktop(desktop);

  // Só atualiza mostrarFiltrosMobile se estiver em transição para desktop
  if (desktop) {
    setMostrarFiltrosMobile(true);
  }
  // NÃO fecha automaticamente no mobile
};


    window.addEventListener("resize", handleResize);

    // Roda no mount para ajustar o estado inicial
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Persistir favoritos no localStorage
  useEffect(() => {
    const salvos = localStorage.getItem("favoritos");
    if (salvos) setFavoritos(JSON.parse(salvos));
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

 


  // Bairros dinâmicos baseados na cidade selecionada
  const bairrosDinamicos = ["Todos", ...new Set(
    imoveisData
      .filter((i) => cidadeSelecionada === "Todas" || i.cidade === cidadeSelecionada)
      .map((i) => i.bairro)
  )];

  // Filtragem dos imóveis
  const imoveisFiltrados = imoveisData
    .filter((i) => tipoSelecionado === "Todos" || i.tipo === tipoSelecionado)
    .filter((i) => cidadeSelecionada === "Todas" || i.cidade === cidadeSelecionada)
    .filter((i) => bairroSelecionado === "Todos" || i.bairro === bairroSelecionado)
    .filter((i) =>
      quartosSelecionados === "Qualquer"
        ? true
        : quartosSelecionados === "5+"
          ? i.quartos >= 5
          : i.quartos === parseInt(quartosSelecionados)
    )
    .filter((i) => precoMin === "" || i.preco >= parseInt(precoMin))
    .filter((i) => precoMax === "" || i.preco <= parseInt(precoMax))
    .filter((i) => finalidadeSelecionada === "Todos" || i.finalidade === finalidadeSelecionada)
    .filter((i) => statusSelecionado === "Todos" || i.status === statusSelecionado)
    .filter((i) =>
      amenidadesSelecionadas.length === 0
        ? true
        : amenidadesSelecionadas.every((a) => i.amenidades.includes(a))
    )
    .filter((i) => {
      const buscaLower = busca.toLowerCase();
      return (
        i.titulo.toLowerCase().includes(buscaLower) ||
        i.cidade.toLowerCase().includes(buscaLower) ||
        i.bairro.toLowerCase().includes(buscaLower)
      );
    });

    

  const totalPaginas = Math.ceil(imoveisFiltrados.length / itensPorPagina);
  const imoveisPaginaAtual = imoveisFiltrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  // Dentro do seu componente RealEstatePage, antes do return:
const handleChangePage = (p: number) => {
  setPaginaAtual(p);
  if (imoveisContainerRef.current) {
    const top =
      imoveisContainerRef.current.getBoundingClientRect().top +
      window.pageYOffset -
      OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }
};





  return (
    <>

      <main
        className=" font-sans bg-gray-50 min-h-screen flex flex-col"

      >
        {/* Hero */}
        <div
          className="relative bg-cover bg-center h-[400px] md:h-[500px]"
          style={{ backgroundImage: `url(${destaqueImg})` }} // mantém o destaque aqui
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 md:px-20 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-xl">
              Encontre seu imóvel ideal com o melhor custo-benefício
            </h1>
            <p className="mb-6 max-w-md text-lg">
              Casas, apartamentos, coberturas e muito mais. Tudo em um só lugar.
            </p>
            <div className="bg-white w-full max-w-xl rounded-lg p-4 flex items-center gap-4 shadow-md">
              <FaSearch className="text-gray-600" />
              <input
                type="text"
                placeholder="Buscar por endereço ou cidade..."
                className="flex-1 outline-none text-gray-800 placeholder-gray-500"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Botão para mostrar filtros no mobile */}
        <div className="md:hidden flex justify-end max-w-6xl mx-auto px-4 py-2">
          <button
            onClick={() => setMostrarFiltrosMobile((m) => !m)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            aria-expanded={mostrarFiltrosMobile}
            aria-controls="filtros-mobile"
          >
            {mostrarFiltrosMobile ? (
              <>
                <FaTimes /> Fechar filtros
              </>
            ) : (
              <>
                <FaFilter /> Filtros
              </>
            )}
          </button>
        </div>

        {/* Filtros - desktop e mobile */}
        <section
          id="filtros-mobile"
          className={`max-w-6xl mx-auto px-4 py-6 space-y-4
          md:block
          ${mostrarFiltrosMobile
              ? "block max-h-[1000px] opacity-100 transition-all duration-500 ease-in-out overflow-visible"
              : "hidden max-h-0 opacity-0 transition-all duration-500 ease-in-out overflow-hidden"
            }
        `}
        >
          <h2 className="text-xl font-semibold">Filtros de busca</h2>

          <div className="flex flex-wrap gap-3">
            {tipos.map((tipo) => (
              <button
                key={tipo}
                onClick={() => setTipoSelecionado(tipo)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${tipoSelecionado === tipo
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                  }`}
              >
                {tipo}
              </button>
            ))}
          </div>

          {/* Selects */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-sm">
            <Select label="Cidade" value={cidadeSelecionada} options={cidadesUnicas} onChange={setCidadeSelecionada} />
            <Select label="Bairro" value={bairroSelecionado} options={bairrosDinamicos} onChange={setBairroSelecionado} />
            <Select label="Quartos" value={quartosSelecionados} options={quartos} onChange={setQuartosSelecionados} />
            <Select label="Finalidade" value={finalidadeSelecionada} options={finalidades} onChange={setFinalidadeSelecionada} />
            <Select label="Status" value={statusSelecionado} options={statusFiltros} onChange={setStatusSelecionado} />
            <div>
              <label className="block mb-1 font-medium">Preço</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="p-2 border rounded w-full"
                  placeholder="Mín"
                  value={precoMin}
                  onChange={(e) => setPrecoMin(e.target.value)}
                />
                <input
                  type="number"
                  className="p-2 border rounded w-full"
                  placeholder="Máx"
                  value={precoMax}
                  onChange={(e) => setPrecoMax(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Amenidades */}
          <div className="flex flex-wrap gap-2">
            {amenidadesFiltros.map((a) => (
              <label key={a} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={amenidadesSelecionadas.includes(a)}
                  onChange={(e) =>
                    setAmenidadesSelecionadas((prev) =>
                      e.target.checked ? [...prev, a] : prev.filter((x) => x !== a)
                    )
                  }
                />
                {a}
              </label>
            ))}
          </div>
        </section>

        {/* Lista de imóveis */}
        <section
        ref={imoveisContainerRef}
  className={`max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 md:min-h-[500px] gap-6 ${
    imoveisPaginaAtual.length === 0 ? "md:min-h-[600px]" : ""
  }`}
>

          {imoveisPaginaAtual.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">Nenhum imóvel encontrado.</p>
          ) : (
            imoveisPaginaAtual.map((imovel) => (
              <div
                key={imovel.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col relative"
                onClick={() => navigate(`/imovel/${imovel.id}`)}
                aria-label={`Ver detalhes do ${imovel.titulo}`}
              >
                <div
                  className="h-48 bg-cover bg-center rounded-t-lg"
                  style={{ backgroundImage: `url(${imovel.imagem})` }}
                />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-2">{imovel.titulo}</h3>
                  <p className="text-blue-600 font-bold mb-1">
                    R$ {imovel.preco.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {imovel.endereco}, {imovel.bairro}, {imovel.cidade}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <span className="text-xs bg-gray-200 rounded px-2 py-1">{imovel.tipo}</span>
                    <span className="text-xs bg-gray-200 rounded px-2 py-1">{imovel.quartos} quartos</span>
                    <span className="text-xs bg-gray-200 rounded px-2 py-1">{imovel.banheiros} banheiros</span>
                    <span className="text-xs bg-gray-200 rounded px-2 py-1">{imovel.vagas} vagas</span>
                    <span className="text-xs bg-green-200 text-green-800 rounded px-2 py-1">{imovel.status}</span>
                  </div>
                </div>
                <button
                  className="absolute top-2 right-2 text-red-500 text-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorito(imovel.id);
                  }}
                  aria-label={
                    favoritos.includes(imovel.id)
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }
                >
                  {favoritos.includes(imovel.id) ? <FaRegHeart /> : <FaRegHeart className="opacity-30" />}
                </button>
              </div>
            ))
          )}
        </section>

        {/* Paginação */}
        <nav
          className="max-w-6xl mx-auto px-4 py-6 flex justify-center gap-2"
          aria-label="Paginação dos imóveis"
        >
          <button
  disabled={paginaAtual === 1}
  onClick={() => handleChangePage(Math.max(1, paginaAtual - 1))}
  className="px-3 py-1 rounded bg-blue-600 text-white disabled:bg-gray-400"
  aria-disabled={paginaAtual === 1}
>
  Anterior
</button>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => handleChangePage(p)}
              className={`px-3 py-1 rounded ${paginaAtual === p ? "bg-blue-800 text-white" : "bg-white text-blue-600 border border-blue-600"
                }`}
              aria-current={paginaAtual === p ? "page" : undefined}
            >
              {p}
            </button>
          ))}
          <button
  disabled={paginaAtual === totalPaginas}
  onClick={() => handleChangePage(Math.min(totalPaginas, paginaAtual + 1))}
  className="px-3 py-1 rounded bg-blue-600 text-white disabled:bg-gray-400"
  aria-disabled={paginaAtual === totalPaginas}
>
  Próximo
</button>
        </nav>
        {/* Background de prédios fixo acima do footer */}
        <div className="w-full flex justify-center">
          <img src={background} alt="Prédios" className="h-full -mt-30 -mb-60 md:-mt-300 md:-mb-100 object-contain pointer-events-none" />
        </div>


        <footer className="bg-white border-t mt-40 md:mt-10">
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-700">

            {/* Sobre */}
            <div> 
              <h3 className="text-lg font-semibold text-blue-600 mb-3">ImobiFácil</h3>
              <p className="text-gray-600">
                Encontre os melhores imóveis para comprar ou alugar com praticidade, confiança e segurança.
              </p>
            </div>

            {/* Links úteis */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Navegação</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-blue-600">Início</a></li>
                <li><a href="#" className="hover:text-blue-600">Buscar Imóveis</a></li>
                <li><a href="#" className="hover:text-blue-600">Favoritos</a></li>
                <li><a href="#" className="hover:text-blue-600">Contato</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Contato</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Email: contato@imobifacil.com</li>
                <li>Telefone: (11) 99999-0000</li>
                <li>Endereço: Av. Imóveis, 123 - São Paulo/SP</li>
              </ul>
            </div>

            {/* Redes sociais */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Siga-nos</h4>
              <div className="flex gap-4 text-blue-600 text-xl">
                <a href="#" aria-label="Facebook" className="hover:text-blue-800">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-pink-500">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-blue-700">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>

          </div>

          <div className="bg-gray-100 text-center py-4 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ImobiFácil. Todos os direitos reservados.
          </div>
        </footer>


      </main>
    </>
  );
};

// Componente Select reutilizável
type SelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};
const Select = ({ label, value, options, onChange }: SelectProps) => {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RealEstatePage;
