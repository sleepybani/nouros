import { marked } from 'marked';

/** Fetches public/notes/<slug>.md and turns it into HTML. Angular sanitizes it when bound to [innerHTML]. */
export async function loadNoteHtml(slug: string): Promise<string> {
  const response = await fetch(`notes/${slug}.md`);
  if (!response.ok) {
    throw new Error(`Note "${slug}" not found (${response.status})`);
  }
  const markdown = await response.text();
  return marked.parse(markdown, { async: false });
}
