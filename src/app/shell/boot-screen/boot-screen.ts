import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { PROFILE } from '../../data/profile';

export const BOOT_LINES: readonly string[] = [
  'Loading colors…',
  'Mounting /projects…',
  'Brewing coffee…',
  'Organizing controlled chaos…',
];

const LINE_INTERVAL_MS = 350;
const FINAL_PAUSE_MS = 500;

@Component({
  selector: 'app-boot-screen',
  templateUrl: './boot-screen.html',
  styleUrl: './boot-screen.scss',
  host: {
    '(click)': 'skip()',
    '(document:keydown)': 'skip()',
  },
})
export class BootScreen {
  readonly finished = output<void>();

  protected readonly tagline = PROFILE.tagline;
  protected readonly visibleLines = signal<string[]>([]);

  private readonly timers: ReturnType<typeof setTimeout>[] = [];
  private hasFinished = false;

  constructor() {
    BOOT_LINES.forEach((line, index) => {
      this.timers.push(
        setTimeout(
          () => this.visibleLines.update((lines) => [...lines, line]),
          (index + 1) * LINE_INTERVAL_MS,
        ),
      );
    });
    const totalDuration = BOOT_LINES.length * LINE_INTERVAL_MS + FINAL_PAUSE_MS;
    this.timers.push(setTimeout(() => this.finish(), totalDuration));

    inject(DestroyRef).onDestroy(() => this.timers.forEach(clearTimeout));
  }

  protected skip(): void {
    this.finish();
  }

  private finish(): void {
    if (this.hasFinished) {
      return;
    }
    this.hasFinished = true;
    this.finished.emit();
  }
}
