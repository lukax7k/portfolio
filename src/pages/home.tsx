import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';


import ProjectCard from '../components/projectCard';
import ThemeToggle from '../components/themeToggle';

import { projects } from '../data/projects';
import whatsappIcon from '../assets/whatsapp.svg';
import profileImage from '../assets/profile.png';

import logoLight from '../assets/logolight.png';
import logoDark from '../assets/logodark.png';

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
  const [currentLogo, setCurrentLogo] = useState(logoLight);

  useEffect(() => {
    const updateLogo = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentLogo(isDark ? logoDark : logoLight);
    };

    updateLogo(); // inicial
    const observer = new MutationObserver(updateLogo);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main
      className="
        min-h-screen 
        bg-gradient-to-b 
        from-blue-50 via-blue-100 to-gray-200
        dark:from-black dark:via-gray-900 dark:to-black
        text-black dark:text-white 
        transition-colors duration-500 p-6
      "
    >
      {/* TOPO COM LOGO + TOGGLE */}
      <div className="flex items-center justify-between">
        <img
          src={currentLogo}
          alt="Logo Lucas Moura"
          className="
      h-48 w-auto
      mx-auto
      md:mx-0
      transition-opacity duration-500
    "
        />
        <div className="absolute right-6 top-6 ml-auto">
          <ThemeToggle />
        </div>
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
            Prazer, eu sou <span className="text-purple-600">Lucas</span> 👋
          </h1>
          <motion.p
            className="text-lg text-blue-900 dark:text-blue-300 mb-4 transition-colors duration-500"
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
              className="
                border border-purple-600
                dark:border-purple-400
                px-6 py-2 rounded-lg
                hover:bg-purple-700 dark:hover:bg-purple-500
                hover:text-white dark:hover:text-white
                transition-colors duration-300 mb-8
              "
            >
              Entrar em contato
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-600 shadow-lg mx-auto md:mx-0"
          variants={fadeInVariant}
          initial="hidden"
          animate="visible"
          custom={0.6}
        >
          <img
            src={profileImage}
            alt="Foto de Lucas"
            className="w-full h-full object-cover transition-shadow duration-500"
          />
        </motion.div>
      </section>

      <hr className="border-blue-700 dark:border-purple-600 transition-colors duration-500 mb-8" />

      {/* SOBRE EXPANSÍVEL */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900 dark:text-purple-400">Sobre mim</h2>
        <p className="text-blue-900 dark:text-blue-300 transition-colors duration-500">
          Sou desenvolvedor de sites com foco em criar interfaces modernas, responsivas e acessíveis...
          {!showMore && (
            <button
              onClick={() => setShowMore(true)}
              className="ml-2 text-purple-600 underline"
            >
              Ler mais
            </button>
          )}
        </p>

        {/* Texto expandido com animação */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              key="extraContent"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-4 space-y-4"
            >
              <p className="text-blue-900 dark:text-blue-300 transition-colors duration-500">
                Tenho experiência em React, JavaScript, HTML, CSS, Tailwind, TypeScript e otimizações de performance.
                Acredito que um bom site vai além do visual – ele precisa ser funcional, rápido e fácil de usar.
              </p>
              <p className="text-blue-900 dark:text-blue-300 transition-colors duration-500">
                Meu foco é transformar a sua ideia em uma aplicação funcional de alta qualidade. Desenvolvo soluções como:
                sites completos, landing pages, cardápios digitais e páginas para uso pessoal ou profissional.
              </p>
              <p className="text-blue-900 dark:text-blue-300 transition-colors duration-500">
                Confira abaixo alguns exemplos práticos do meu trabalho:
              </p>
              <button
                onClick={() => setShowMore(false)}
                className="mt-2 text-purple-600 underline"
              >
                Mostrar menos
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>


      <hr className="border-blue-700 dark:border-purple-600 transition-colors duration-500 mb-8" />

      {/* PROJETOS */}
      <section className="mb-16" id="projetos">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900 dark:text-purple-400">Projetos</h2>
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

      <hr className="border-blue-700 dark:border-purple-600 transition-colors duration-500 mb-8" />

      {/* CONTATOS */}
      <footer
        id="contatos"
        className="
          bg-purple-700 dark:bg-purple-900 
          text-white text-center py-8 rounded-2xl shadow-lg
        "
      >
        <h2 className="text-xl font-semibold mb-2">Entre em contato</h2>
        <p className="mb-1">
          📧 <a
            href="mailto:lucasfagundesm12@gmail.com"
            aria-label="Enviar email para lucasfagundesm12@gmail.com"
            className="underline text-blue-200 hover:text-white transition"
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
            className="underline text-blue-200 hover:text-white transition"
          >
            (19) 99991-5532
          </a>
        </p>
      </footer>
    </main>
  );
};

export default Home;
