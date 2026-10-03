import { DatePipe } from '@angular/common';
import {
  Component,
  PendingTasks,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { AppLauncher } from '../../core/app-launcher';
import { APP_PARAMS } from '../../core/app-params';
import { findAppById } from '../../core/app-registry';
import { NOTES, Note, findNoteBySlug } from '../../data/notes';
import { loadNoteHtml } from './note-loader';

type NoteContent = { state: 'loading' } | { state: 'loaded'; html: string } | { state: 'error' };

@Component({
  selector: 'app-notes',
  imports: [DatePipe],
  templateUrl: './notes.html',
  styleUrl: './notes.scss',
})
export class Notes {
  private readonly launcher = inject(AppLauncher);
  private readonly appParams = inject(APP_PARAMS);
  private readonly pendingTasks = inject(PendingTasks);
  private readonly notesApp = findAppById('notes');

  protected readonly notes = NOTES;
  protected readonly openedSlug = computed(() => this.appParams()['slug']);
  protected readonly openedNote = computed(() => {
    const slug = this.openedSlug();
    return slug ? findNoteBySlug(slug) : undefined;
  });
  protected readonly content = signal<NoteContent>({ state: 'loading' });
  protected readonly noteHtml = computed(() => {
    const content = this.content();
    return content.state === 'loaded' ? content.html : '';
  });

  constructor() {
    effect(() => {
      const note = this.openedNote();
      if (note) {
        untracked(() => this.loadContent(note));
      }
    });
  }

  protected openNote(note: Note): void {
    this.launcher.launch(this.notesApp, note.slug);
  }

  protected backToList(): void {
    this.launcher.launch(this.notesApp);
  }

  private loadContent(note: Note): void {
    this.content.set({ state: 'loading' });
    this.pendingTasks.run(async () => {
      try {
        const html = await loadNoteHtml(note.slug);
        if (this.openedNote() === note) {
          this.content.set({ state: 'loaded', html });
        }
      } catch {
        this.content.set({ state: 'error' });
      }
    });
  }
}
