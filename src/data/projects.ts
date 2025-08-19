import housestore from '../assets/housestore.png';
import cardapio from '../assets/cardapio.png';
import blog from '../assets/blog.png';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Loja de Móveis',
    description: 'Veja um modelo de site para se basear em um para a sua loja.',
    image: housestore,
  },
  {
    id: '2',
    title: 'Cardápio Digital',
    description: 'Veja um modelo de cardápio digital pra se basear em um para seu estabelecimento',
    image: cardapio,
  },
  {
    id: '3',
    title: 'Blog/Noticias',
    description: 'Veja um modelo para seu Blog pessoal ou proficional.',
    image: blog,
  },
];
