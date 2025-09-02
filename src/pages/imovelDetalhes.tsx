import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaRegHeart, FaHeart } from "react-icons/fa";

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

const statusPossiveis: Status[] = ["Novo", "Usado", "Em Construção"];
const amenidadesPossiveis = [
  "Piscina",
  "Academia",
  "Churrasqueira",
  "Playground",
  "Elevador",
  "Portaria 24h",
];

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
  const [favoritos, setFavoritos] = useState<number[]>([]);

  const imovel = imoveisData.find((i) => i.id === Number(id));

  useEffect(() => {
    const salvos = localStorage.getItem("favoritos");
    if (salvos) setFavoritos(JSON.parse(salvos));
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

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

  const similares = imoveisData
    .filter(
      (i) =>
        i.id !== imovel.id &&
        i.cidade === imovel.cidade &&
        i.tipo === imovel.tipo &&
        i.finalidade === imovel.finalidade
    )
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/projeto/1")}
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
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {imovel.titulo}
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                {imovel.status}
              </span>
            </h1>
            <button onClick={() => toggleFavorito(imovel.id)} aria-label="Favoritar">
              {favoritos.includes(imovel.id) ? (
                <FaHeart className="text-2xl text-red-500" />
              ) : (
                <FaRegHeart className="text-2xl text-gray-400 hover:text-red-500" />
              )}
            </button>
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

          <p className="text-gray-600 leading-relaxed mb-6">
            Este lindo {imovel.tipo.toLowerCase()} localizado em {imovel.bairro},{" "}
            {imovel.cidade} oferece conforto, espaço e localização privilegiada. Com{" "}
            {imovel.quartos} quartos e {imovel.banheiros} banheiros, é ideal para
            famílias ou quem busca espaço para viver com tranquilidade. Agende uma
            visita agora mesmo!
          </p>

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Agendar visita
          </button>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Localização no mapa</h2>
            <iframe
              className="w-full h-64 rounded"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${imovel.endereco}, ${imovel.bairro}, ${imovel.cidade}`
              )}&output=embed`}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {similares.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Imóveis similares</h2>
          <div className="overflow-x-auto md:overflow-visible">
            <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6">
              {similares.map((s) => (
                <div
                  key={s.id}
                  className="min-w-[250px] md:min-w-0 bg-white rounded-lg shadow cursor-pointer hover:shadow-lg transition"
                  onClick={() => navigate(`/imovel/${s.id}`)}
                >
                  <img
                    src={s.imagem}
                    alt={s.titulo}
                    className="h-48 w-full object-cover rounded-t"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{s.titulo}</h3>
                    <p className="text-sm text-gray-500">
                      {s.bairro}, {s.cidade}
                    </p>
                    <p className="text-blue-600 font-bold mt-2">
                      R$ {s.preco.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ImovelDetalhes;
