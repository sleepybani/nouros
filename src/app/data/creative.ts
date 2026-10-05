export interface Artwork {
  slug: string;
  title: string;
  year: number;
  medium: string;
  image: string;
  description: string;
}

export interface Swatch {
  name: string;
  cssVariable: string;
}

export interface Hobby {
  emoji: string;
  name: string;
  description: string;
}

/** Put the images in public/paintings/ and reference them as 'paintings/<file>.webp'. */
export const ARTWORKS: readonly Artwork[] = [];

export const NOUROS_PALETTE: readonly Swatch[] = [
  { name: 'Lavender', cssVariable: '--color-lavender' },
  { name: 'Pink', cssVariable: '--color-pink' },
  { name: 'Mint', cssVariable: '--color-mint' },
  { name: 'Peach', cssVariable: '--color-peach' },
  { name: 'Sky', cssVariable: '--color-sky' },
  { name: 'Night', cssVariable: '--color-bg' },
];

export const ARTIST_NOTES: readonly string[] = [
  'Color is the first thing I design with, in code and on canvas.',
  'Painting teaches patience: you cannot hot-reload a brushstroke.',
  'A blank canvas and an empty component feel exactly the same.',
];

export const HOBBIES: readonly Hobby[] = [
  {
    emoji: '🎮',
    name: 'League of Legends',
    description: 'Strategy, teamwork and a lot of "one last game".',
  },
  {
    emoji: '💃',
    name: 'Dance & yoga',
    description: 'The best way to reset my brain after debugging.',
  },
  { emoji: '🎨', name: 'Painting', description: 'Colors first, rules later. See Paint.exe.' },
  { emoji: '✈️', name: 'Travel', description: 'New places, new colors, new ideas.' },
  {
    emoji: '🤝',
    name: 'Diversity & ethical AI',
    description: 'Tech is better when everyone can build it and trust it.',
  },
];
