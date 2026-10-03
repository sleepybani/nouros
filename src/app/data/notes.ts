export type NoteCategory = 'dev' | 'art' | 'learning' | 'women in tech' | 'life';

export interface Note {
  slug: string;
  title: string;
  date: string;
  category: NoteCategory;
  summary: string;
}

/** Newest first. The text of each note lives in public/notes/<slug>.md. */
export const NOTES: readonly Note[] = [
  {
    slug: 'why-an-operating-system',
    title: 'Why my portfolio is an operating system',
    date: '2026-10-03',
    category: 'dev',
    summary: 'A portfolio that shows how I think, not just what I built.',
  },
];

export function findNoteBySlug(slug: string): Note | undefined {
  return NOTES.find((note) => note.slug === slug);
}
