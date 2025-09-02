import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

import ProjectCard from '../components/projectCard';
import Button from '../components/button';
import Switch from '../components/switch';
import Tooltip from '../components/contacts';

import { projects } from '../data/projects';
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
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
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

  // Configura timer para mostrar botão "Ler mais" após o texto ser digitado
  useEffect(() => {
    const text = 'Sou desenvolvedor de sites com foco em criar interfaces modernas, responsivas e acessíveis...';
    const typeSpeed = 40; // ms por caractere
    const delaySpeed = 1000; // delay após digitar
    const totalTime = text.length * typeSpeed + delaySpeed;

    const timer = setTimeout(() => {
      setShowReadMoreButton(true);
    }, totalTime);

    return () => clearTimeout(timer);
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
          <Switch />
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
            <Button />
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
          <Typewriter
            words={[
              'Sou desenvolvedor de sites com foco em criar interfaces modernas, responsivas e acessíveis...',
            ]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={40}
            delaySpeed={1000}
          />
          <AnimatePresence>
            {!showMore && showReadMoreButton && (
              <motion.button
                onClick={() => setShowMore(true)}
                className="ml-2 text-purple-600 underline"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                Ler mais
              </motion.button>
            )}
          </AnimatePresence>
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

              <h3 className="text-2xl font-semibold mb-4 text-blue-900 dark:text-purple-400">Como trabalho</h3>

              <p className="text-blue-900 dark:text-blue-300 transition-colors duration-500"><strong>💻 Como funciona meu trabalho como desenvolvedor web:</strong><br></br></p>

              <p className="text-blue-900 dark:text-blue-300 transition-colors duration-500">
                <strong>1. Você faz o pedido:</strong> Me conta o que precisa — tipo de site, funcionalidades desejadas e estilo visual.<br></br>
                <strong>2. Planejamento e proposta:</strong> Com base nas suas ideias, envio uma proposta com prazos, valores e tudo o que será feito.<br></br>
                <strong>3. Criação e programação do site:</strong> Desenvolvo o site com base no que combinamos, usando tecnologias modernas, design responsivo e otimizado.<br></br>
                <strong>4. Revisão com você:</strong> Antes de finalizar, te envio o site para revisar. Você pode pedir ajustes, se necessário.<br></br>
                <strong>5. Hospedagem e publicação:</strong> Te ajudo a escolher e hospedar seu site em um servidor rápido e seguro.<br></br>
                <strong>6. Entrega e suporte:</strong> Entrego tudo funcionando e continuo disponível para suporte básico.
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
        <h2 className="text-2xl font-semibold mb-6 text-blue-900 dark:text-purple-400">Projetos</h2>
        <div className="flex flex-wrap justify-center md:gap-20 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="w-[280px] md:w-[300px]"
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
        <h2 className="text-xl font-semibold mb-6">Entre em contato</h2>
        <Tooltip />
      </footer>
    </main>
  );
};

export default Home;
