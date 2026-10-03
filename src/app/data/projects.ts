export interface ProjectLinks {
  live?: string;
  repo?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  year: number;
  role: string;
  stack: readonly string[];
  context: string;
  problem: string;
  solution: string;
  screenshots: readonly string[];
  links: ProjectLinks;
}

export const PROJECTS: readonly Project[] = [
  {
    slug: 'ev-on',
    name: 'EV-ON',
    tagline: 'Description coming soon.',
    year: 2025,
    role: 'Full-stack developer',
    stack: ['Angular', 'NestJS', 'TypeScript'],
    context: 'Coming soon.',
    problem: 'Coming soon.',
    solution: 'Coming soon.',
    screenshots: [],
    links: {},
  },
  {
    slug: 'atelier-des-jasmins',
    name: 'Atelier des Jasmins',
    tagline: 'A bilingual gallery website for an art workshop.',
    year: 2025,
    role: 'Front-end developer',
    stack: ['Angular', 'Angular SSR', 'Transloco', 'Vercel'],
    context: 'An art workshop needed a website to show its artworks and share its news.',
    problem:
      'The site had to be fast, easy to find on Google, and readable in more than one language.',
    solution:
      'An Angular app with server-side rendering for SEO and speed, Transloco for translations, and posts for news. Deployed on Vercel.',
    screenshots: [],
    links: {},
  },
  {
    slug: 'evento',
    name: 'Evento',
    tagline: 'Description coming soon.',
    year: 2024,
    role: 'Full-stack developer',
    stack: ['TypeScript'],
    context: 'Coming soon.',
    problem: 'Coming soon.',
    solution: 'Coming soon.',
    screenshots: [],
    links: {},
  },
  {
    slug: 'kc-media',
    name: 'KC Media',
    tagline: 'An online store for gaming and streaming gear.',
    year: 2025,
    role: 'Full-stack developer',
    stack: ['Angular', 'Angular SSR', 'NestJS', 'Prisma', 'AWS S3', 'JWT', 'Docker'],
    context: 'KC Media sells gaming electronics and streaming equipment and needed its own shop.',
    problem:
      'Products, customer accounts and media files (product images and videos) had to be managed securely in one place.',
    solution:
      'An Angular SSR front end for fast, SEO-friendly pages, talking to a NestJS API. Prisma for the database, S3 for media files, JWT and Passport for authentication, Swagger for API docs, Docker Compose to run everything locally.',
    screenshots: [],
    links: {},
  },
  {
    slug: 'chatbot-ati',
    name: 'Chatbot ATI',
    tagline: 'Description coming soon.',
    year: 2024,
    role: 'Developer',
    stack: ['TypeScript'],
    context: 'Coming soon.',
    problem: 'Coming soon.',
    solution: 'Coming soon.',
    screenshots: [],
    links: {},
  },
];

export function findProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
