import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPython,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
} from 'react-icons/si';

const TechIcons = () => {
  const icons = [
    { icon: <FaReact />, color: 'text-cyan-400', title: 'React' },
    { icon: <SiTypescript />, color: 'text-blue-500', title: 'TypeScript' },
    { icon: <FaJs />, color: 'text-yellow-400', title: 'JavaScript' },
    { icon: <FaHtml5 />, color: 'text-orange-500', title: 'HTML5' },
    { icon: <FaCss3Alt />, color: 'text-blue-400', title: 'CSS3' },
    { icon: <SiTailwindcss />, color: 'text-teal-400', title: 'TailwindCSS' },
    { icon: <FaPython />, color: 'text-yellow-300', title: 'Python' },
    { icon: <FaNodeJs />, color: 'text-green-500', title: 'Node.js' },
    { icon: <SiMongodb />, color: 'text-green-400', title: 'MongoDB' },
  ];

  return (
    <section className="mb-10">
  <hr className="border-blue-700 dark:border-purple-600 mb-6 transition-colors duration-500" />

  <h2 className="text-2xl font-semibold text-blue-900 dark:text-purple-400 mb-4">
    Tecnologias
  </h2>

  <div className="flex flex-wrap gap-6">
    {icons.map(({ icon, color, title }, index) => (
      <div
        key={index}
        className={`text-4xl ${color} drop-shadow-[0_0_6px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_10px] transition-transform duration-300 hover:scale-110`}
        title={title}
      >
        {icon}
      </div>
    ))}
  </div>
</section>
  );
};

export default TechIcons;
