import ProjectCard from '../components/projectCard';
import { projects } from '../data/projects';
import whatsappIcon from '../assets/whatsapp.svg';
import profileImage from '../assets/profile.png';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import ThemeToggle from '../components/themeToggle';

const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      delay: custom,
    },
  }),
};

const Home = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-gray-300
                 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900
                 text-black dark:text-white transition-colors duration-500 p-6"
    >
      {/* Botão toggle fixo no topo direito */}
      <div className="flex justify-end mb-6">
        <ThemeToggle />
      </div>

      {/* INTRODUÇÃO */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
        <motion.div
          className="text-center md:text-left flex-1"
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          <h1 className="text-4xl font-bold mb-2 leading-tight">
            Prazer, eu sou <span className="text-purple-500">Lucas</span> 👋
          </h1>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-500"
            variants={fadeInVariant}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            Transformo ideias em experiências digitais envolventes, responsivas e acessíveis.
            Tenho paixão por desenvolvimento web moderno e por entregar soluções que realmente fazem a diferença.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={fadeInVariant}
            initial="hidden"
            animate="visible"
            custom={0.5}
          >
            <button
              onClick={() => document.getElementById("contatos")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-gray-800 dark:border-white px-6 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-white hover:text-purple-800 transition-colors duration-500 mb-8"
            >
              Entrar em contato
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg mx-auto md:mx-0"
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
          custom={0.6}
        >
          <img src={profileImage} alt="Foto de Lucas" className="w-full h-full object-cover transition-shadow duration-500" />
        </motion.div>
      </section>

      <hr className="border-gray-300 dark:border-gray-600 transition-colors duration-500 mb-8" />

      {/* SOBRE EXPANSÍVEL */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Sobre mim</h2>
        <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
          Sou desenvolvedor de sites com foco em criar interfaces modernas, responsivas e acessíveis...
          {!showMore && (
            <button
              onClick={() => setShowMore(true)}
              className="ml-2 text-purple-500 underline"
            >
              Ler mais
            </button>
          )}
        </p>
        {showMore && (
          <div className="mt-4 space-y-4">
            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
              Tenho experiência em React, JavaScript, HTML, CSS, Tailwind, TypeScript e otimizações de performance.
              Acredito que um bom site vai além do visual – ele precisa ser funcional, rápido e fácil de usar.
            </p>
            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">
              Meu foco é transformar a sua ideia em uma aplicação funcional de alta qualidade. Desenvolvo soluções como:
              sites completos, landing pages, cardápios digitais e páginas para uso pessoal ou profissional.
            </p>
            <p className="text-gray-700 dark:text-gray-300 transition-colors duration-500">Confira abaixo alguns exemplos práticos do meu trabalho:</p>
            <button
              onClick={() => setShowMore(false)}
              className="mt-2 text-purple-500 underline"
            >
              Mostrar menos
            </button>
          </div>
        )}
      </section>

      <hr className="border-gray-300 dark:border-gray-600 transition-colors duration-500 mb-8" />

      {/* PROJETOS */}
      <section className="mb-16" id="projetos">
        <h2 className="text-2xl font-semibold mb-4">Projetos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </section>

      <hr className="border-gray-300 dark:border-gray-600 transition-colors duration-500 mb-8" />

      {/* CONTATOS */}
      <footer
        id="contatos"
        className="bg-purple-600 dark:bg-purple-800 text-white text-center py-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-2">Entre em contato</h2>
        <p className="mb-1">
          📧 <a
            href="mailto:lucasfagundesm12@gmail.com"
            aria-label="Enviar email para lucasfagundesm12@gmail.com"
            className="underline hover:text-gray-200 transition"
          >
            lucasfagundesm12@gmail.com
          </a>
        </p>
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
            aria-label="Conversar no WhatsApp com (19) 99991-5532"
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
