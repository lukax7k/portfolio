import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRegHeart } from "react-icons/fa";

// Mesmo tipo do RealEstatePage
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

// Usar exatamente os dados mockados da RealEstatePage
const statusPossiveis: Status[] = ["Novo", "Usado", "Em Construção"];
const amenidadesPossiveis = [
  "Piscina",
  "Academia",
  "Churrasqueira",
  "Playground",
  "Elevador",
  "Portaria 24h",
];

// Dados mockados gerados da mesma forma do RealEstatePage
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

const ImovelDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const imovel = imoveisData.find((i) => i.id === Number(id));

  if (!imovel) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">Imóvel não encontrado</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline flex items-center gap-2"
        >
          <FaArrowLeft /> Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline flex items-center gap-2 mb-4"
      >
        <FaArrowLeft /> Voltar
      </button>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <img
          src={imovel.imagem}
          alt={imovel.titulo}
          className="w-full h-96 object-cover"
        />

        <div className="p-6">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl font-bold text-gray-800">{imovel.titulo}</h1>
            <FaRegHeart className="text-2xl text-gray-400 cursor-pointer hover:text-red-500" />
          </div>

          <p className="text-blue-600 font-semibold text-sm mb-2">
            {imovel.tipo} • {imovel.bairro}, {imovel.cidade}
          </p>

          <p className="text-gray-700 mb-4">
            Área: <strong>{imovel.area} m²</strong> <br />
            Quartos: <strong>{imovel.quartos}</strong> <br />
            Banheiros: <strong>{imovel.banheiros}</strong> <br />
            Vagas na garagem: <strong>{imovel.vagas}</strong> <br />
            Finalidade: <strong>{imovel.finalidade}</strong> <br />
            Status: <strong>{imovel.status}</strong>
          </p>

          {imovel.amenidades.length > 0 && (
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Amenidades:</h2>
              <ul className="list-disc list-inside text-gray-600">
                {imovel.amenidades.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xl font-bold text-gray-800 mb-6">
            {imovel.preco < 10000
              ? `R$ ${imovel.preco.toLocaleString("pt-BR")}/mês`
              : `R$ ${imovel.preco.toLocaleString("pt-BR")}`}
          </p>

          <p className="text-gray-600 leading-relaxed">
            Este lindo {imovel.tipo.toLowerCase()} localizado em {imovel.bairro}, {imovel.cidade} oferece
            conforto, espaço e localização privilegiada. Com {imovel.quartos} quartos e{" "}
            {imovel.banheiros} banheiros, é ideal para famílias ou quem busca espaço
            para viver com tranquilidade. Agende uma visita agora mesmo!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImovelDetalhes;
