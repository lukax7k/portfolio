import ProjectCard from '../components/projectCard';
import { projects } from '../data/projects';
import whatsappIcon from '../assets/whatsapp.svg';


const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white p-6">

      {/* HERO */}
      <header className="flex flex-col justify-center items-center md:items-start mb-10 text-center md:text-left" role="banner">
        <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400 pb-4">
          Tire sua ideia do papel
        </h1>
        <p className="text-lg mb-4">
          Design exclusivo, funcionalidade sob medida e performance impecável
        </p>
        <p className="text-lg mb-4">
          Seu negócio merece um site que reflita sua identidade única. 
          Desenvolvo sites personalizados, responsivos e otimizados para garantir que você 
          se destaque na web. <br /> <span className="text-purple-400 font-bold underline">Solicite um orçamento</span> e leve sua marca para o próximo nível!
        </p>

        {/* Botão "Ver contatos" só para mobile */}
        <div className="block md:hidden w-full flex-justify-center pb-4">
          <button
            onClick={() => document.getElementById("contatos")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition"
          >
            Ver contatos
          </button>
        </div>

        <div>
          <p className="text-lg mb-4">
            Confira algumas referências:
          </p>
        </div>
      </header>

      {/* PROJETOS */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </section>

      {/* CONTATOS / FOOTER */}
      <footer
        id="contatos"
        className="bg-purple-600 dark:bg-purple-800 text-white text-center py-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-2">Entre em contato</h2>

        {/* Email com mailto */}
        <p className="mb-1">
          📧 <a
            href="mailto:lucasfagundesm12@gmail.com"
            className="underline hover:text-gray-200 transition"
          >
            lucasfagundesm12@gmail.com
          </a>
        </p>

        {/* WhatsApp com link direto */}
        <p className="flex items-center justify-center gap-2">
          <img
            src={whatsappIcon}
            alt="WhatsApp"
            className="w-5 h-5 inline"
          />

          <a
            href="https://wa.me/5519999915532"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-200 transition"
          >
            (19) 99991-5532
          </a>
        </p>

      </footer>

    </main>
  );
};

export default Home;
