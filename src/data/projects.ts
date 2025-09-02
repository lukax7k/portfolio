import housestore from '../assets/housestore.png';
import cardapio from '../assets/cardapio.png';
import blog from '../assets/blog.png';
import imovel from '../assets/imovel.png';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Site de Imovéis',
    description: 'Veja um modelo para seu site de imobiliária para exibir seus imóveis',
    image: imovel,
  },
  {
    id: '2',
    title: 'Loja de Móveis',
    description: 'Veja um modelo de site para se basear em um para a sua loja.',
    image: housestore,
  },
  {
    id: '3',
    title: 'Cardápio Digital',
    description: 'Veja um modelo de cardápio digital pra se basear em um para seu estabelecimento',
    image: cardapio,
  },
  {
    id: '4',
    title: 'Blog/Noticias',
    description: 'Veja um modelo para seu Blog pessoal ou proficional.',
    image: blog,
  },
  
  
];
