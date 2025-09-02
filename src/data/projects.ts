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
  title: 'Site de Imóveis',
  description: 'Modelo moderno e funcional para sites de imobiliárias — ideal para divulgar imóveis de forma clara e atrativa.',
  image: imovel,
},
{
  id: '2',
  title: 'Loja de Móveis',
  description: 'Layout elegante e responsivo para lojas de móveis — perfeito para apresentar seus produtos e atrair clientes.',
  image: housestore,
},
{
  id: '3',
  title: 'Cardápio Digital',
  description: 'Interface prática e intuitiva para cardápios digitais — ideal para bares, lanchonetes e restaurantes.',
  image: cardapio,
},
{
  id: '4',
  title: 'Blog / Notícias',
  description: 'Template versátil para blogs ou portais de notícias — compartilhe conteúdos com visual limpo e leitura agradável.',
  image: blog,
}

  
  
];
