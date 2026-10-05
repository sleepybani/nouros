import { Component, ElementRef, afterRenderEffect, inject, signal, viewChild } from '@angular/core';
import { AppLauncher } from '../../core/app-launcher';
import { findAppById } from '../../core/app-registry';
import { runCommand } from './commands';

interface TerminalEntry {
  id: number;
  command: string;
  lines: readonly string[];
}

const WELCOME_COMMAND = 'whoami';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss',
})
export class Terminal {
  private readonly launcher = inject(AppLauncher);
  private readonly commandInput = viewChild.required<ElementRef<HTMLInputElement>>('commandInput');
  private readonly screen = viewChild.required<ElementRef<HTMLElement>>('screen');

  protected readonly prompt = 'nour@nouros:~$';
  protected readonly entries = signal<TerminalEntry[]>([]);

  private readonly commandHistory: string[] = [];
  private historyCursor = 0;
  private nextEntryId = 0;

  constructor() {
    this.execute(WELCOME_COMMAND);

    afterRenderEffect(() => {
      this.entries();
      const screenElement = this.screen().nativeElement;
      screenElement.scrollTop = screenElement.scrollHeight;
    });
  }

  protected submit(event: Event): void {
    event.preventDefault();
    const inputElement = this.commandInput().nativeElement;
    const command = inputElement.value;
    inputElement.value = '';
    if (command.trim()) {
      this.commandHistory.push(command);
    }
    this.historyCursor = this.commandHistory.length;
    this.execute(command);
  }

  protected showPreviousCommand(event: Event): void {
    event.preventDefault();
    this.moveInHistory(-1);
  }

  protected showNextCommand(event: Event): void {
    event.preventDefault();
    this.moveInHistory(1);
  }

  protected focusInput(): void {
    const isSelectingText = !!document.getSelection()?.toString();
    if (!isSelectingText) {
      this.commandInput().nativeElement.focus();
    }
  }

  private execute(command: string): void {
    const result = runCommand(command);

    if (result.clearScreen) {
      this.entries.set([]);
      return;
    }

    this.entries.update((entries) => [
      ...entries,
      { id: this.nextEntryId++, command, lines: result.lines },
    ]);

    if (result.projectToOpen) {
      this.launcher.launch(findAppById('explorer'), result.projectToOpen);
    }
    if (result.urlToOpen) {
      window.open(result.urlToOpen, '_blank', 'noopener');
    }
  }

  private moveInHistory(step: number): void {
    const newCursor = this.historyCursor + step;
    if (newCursor < 0 || newCursor > this.commandHistory.length) {
      return;
    }
    this.historyCursor = newCursor;
    this.commandInput().nativeElement.value = this.commandHistory[newCursor] ?? '';
  }
}
