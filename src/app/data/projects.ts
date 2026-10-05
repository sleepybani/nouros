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
  /** Not written yet: still listed in Explorer, but hidden from the Quick CV. */
  draft?: boolean;
}

export const PROJECTS: readonly Project[] = [
  {
    slug: 'evo-on',
    name: 'EVO-ON',
    tagline: 'Industrial project for Sidel, where I am technical lead on several critical modules.',
    year: 2022,
    role: 'Full-stack engineer and technical lead',
    stack: ['Angular', 'NestJS', 'TypeScript', 'GCP', 'Docker', 'CI/CD'],
    context:
      'EVO-ON is an industrial project for Sidel. I joined in 2022 as a SFEIR consultant, Sidel hired me in March 2023 for the same role, and I became the technical reference for several critical modules.',
    problem:
      'Critical modules had to keep evolving without breaking: complex features, a growing team, and a delivery that must stay stable.',
    solution:
      'I design and build complex features, refactor and optimize for long-term reliability, write the technical documentation (architecture, patterns, best practices), help the PO clarify the specs, and mentor interns and new developers.',
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
    slug: 'atelier-des-jasmins',
    name: 'Atelier des Jasmins',
    tagline: 'A bilingual online gallery for an art studio.',
    year: 2025,
    role: 'Front-end developer',
    stack: ['Angular', 'Angular SSR', 'Transloco', 'Vercel'],
    context:
      'Atelier des Jasmins is an art studio that wanted to show its artworks online and tell its story.',
    problem:
      'Art lovers had to find and browse the artworks easily, in French or English, and the site had to be fast and visible on Google.',
    solution:
      'An Angular app with server-side rendering for speed and SEO, French and English with Transloco, a searchable artwork gallery, and pages for the story, the values, the FAQ and contact. Deployed on Vercel.',
    screenshots: [],
    links: { live: 'https://atelier-des-jasmins.com/gallery' },
  },
  {
    slug: 'orange-summer-challenge',
    name: 'Orange Summer Challenge',
    tagline: 'Award-winning app to boost plastic waste collection, built for Sisley France.',
    year: 2021,
    role: 'Web developer',
    stack: ['Angular', 'Firebase', 'Cloud Functions', 'Real time', 'Analytics'],
    context:
      'At the Orange Summer Challenge 2021 in Tunisia, teams build a product for a real client. Ours was Sisley France, with a mentor from Google Australia.',
    problem:
      'Increase the collection and recycling of plastic waste, with a product that could later become a startup.',
    solution:
      'A complete prototype with Angular, Firebase and Cloud Functions: real-time features, analytics and a cloud architecture. Delivered as a working MVP to an international jury and awarded best project.',
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
    draft: true,
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
    draft: true,
  },
];

export function findProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
