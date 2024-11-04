import { Link } from '@/types/link';

const linkLimit = 4;
//

const links: Link[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Projects',
    href: '/projects',
  },
  {
    title: 'Blog',
    href: '/blog',
  }
];

export { linkLimit, links };
