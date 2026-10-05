import { GENERATED_NOTES } from './notes.generated';

export type NoteCategory = 'dev' | 'art' | 'learning' | 'women in tech' | 'life';

export interface Note {
  slug: string;
  title: string;
  date: string;
  category: NoteCategory;
  summary: string;
  /** Article published elsewhere (e.g. sfeir.dev): the Notes app links to it instead of loading a body. */
  externalUrl?: string;
  /** Only set when the article is not in English, e.g. 'fr'. */
  language?: string;
}

/**
 * Newest first. Built from the header of each public/notes/<slug>.md file
 * by `npm run notes` (runs automatically before start, test and build).
 */
export const NOTES: readonly Note[] = GENERATED_NOTES;

export function findNoteBySlug(slug: string): Note | undefined {
  return NOTES.find((note) => note.slug === slug);
}

const NEW_ARTICLE_EDITOR = 'https://github.com/sleepybani/nouros/new/main/public/notes';

/** GitHub's "new file" page, pre-filled with an article template. Commit it and the article goes online. */
export function buildNewArticleUrl(today: Date): string {
  const date = today.toISOString().slice(0, 10);
  const template = [
    '---',
    'title: My new article',
    `date: ${date}`,
    'category: dev',
    'summary: One sentence that makes people want to read it.',
    '---',
    '',
    'Start writing here…',
    '',
  ].join('\n');

  const editorUrl = new URL(NEW_ARTICLE_EDITOR);
  editorUrl.searchParams.set('filename', 'my-new-article.md');
  editorUrl.searchParams.set('value', template);
  return editorUrl.toString();
}
