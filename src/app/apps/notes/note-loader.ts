import { marked } from 'marked';

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

/**
 * Fetches public/notes/<slug>.md, drops its header (already in the notes index)
 * and turns the rest into HTML. Angular sanitizes it when bound to [innerHTML].
 */
export async function loadNoteHtml(slug: string): Promise<string> {
  const response = await fetch(`notes/${slug}.md`);
  if (!response.ok) {
    throw new Error(`Note "${slug}" not found (${response.status})`);
  }
  const markdown = await response.text();
  return marked.parse(markdown.replace(FRONTMATTER, ''), { async: false });
}
