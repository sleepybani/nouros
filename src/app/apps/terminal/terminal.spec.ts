import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Terminal } from './terminal';

describe('Terminal', () => {
  let fixture: ComponentFixture<Terminal>;

  const page = () => fixture.nativeElement as HTMLElement;
  const input = () => page().querySelector<HTMLInputElement>('.terminal__input')!;
  const outputText = () => page().querySelector('.terminal__output')!.textContent ?? '';

  const typeCommand = async (command: string) => {
    input().value = command;
    page().querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
  };

  const pressKey = async (key: string) => {
    input().dispatchEvent(new KeyboardEvent('keydown', { key }));
    await fixture.whenStable();
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(Terminal);
    await fixture.whenStable();
  });

  it('greets the visitor with whoami', () => {
    expect(outputText()).toContain('nour@nouros:~$ whoami');
    expect(outputText()).toContain('full-stack JavaScript engineer');
  });

  it('runs a typed command and clears the input', async () => {
    await typeCommand('skills');

    expect(outputText()).toContain('NestJS');
    expect(input().value).toBe('');
  });

  it('clears the screen', async () => {
    await typeCommand('clear');

    expect(page().querySelectorAll('.terminal__entry')).toHaveLength(0);
  });

  it('recalls previous commands with the arrow keys', async () => {
    await typeCommand('skills');
    await typeCommand('funfacts');

    await pressKey('ArrowUp');
    expect(input().value).toBe('funfacts');

    await pressKey('ArrowUp');
    expect(input().value).toBe('skills');

    await pressKey('ArrowDown');
    expect(input().value).toBe('funfacts');
  });

  it('opens a project in Explorer', async () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    await typeCommand('open kc-media');

    expect(navigate).toHaveBeenCalledWith(['/', 'projects', 'kc-media']);
  });
});
