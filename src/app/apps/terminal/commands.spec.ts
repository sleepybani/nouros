import { runCommand } from './commands';

describe('runCommand', () => {
  it('introduces Nour with whoami', () => {
    expect(runCommand('whoami').lines[0]).toContain('full-stack JS developer');
  });

  it('lists every command in help', () => {
    const helpText = runCommand('help').lines.join('\n');

    for (const command of [
      'whoami',
      'skills',
      'projects',
      'open',
      'contact',
      'funfacts',
      'clear',
    ]) {
      expect(helpText).toContain(command);
    }
  });

  it('ignores case and extra spaces', () => {
    expect(runCommand('  WHOAMI  ')).toEqual(runCommand('whoami'));
  });

  it('returns nothing for an empty line', () => {
    expect(runCommand('   ').lines).toEqual([]);
  });

  it('explains unknown commands', () => {
    expect(runCommand('sudo').lines[0]).toBe(
      "command not found: sudo. Type 'help' to see the commands.",
    );
  });

  it('asks the screen to be cleared', () => {
    expect(runCommand('clear').clearScreen).toBe(true);
  });

  describe('open', () => {
    it('opens a known project', () => {
      expect(runCommand('open kc-media').projectToOpen).toBe('kc-media');
    });

    it('refuses an unknown project', () => {
      const result = runCommand('open nope');
      expect(result.projectToOpen).toBeUndefined();
      expect(result.lines[0]).toContain('no project named');
    });

    it('shows usage without a project name', () => {
      expect(runCommand('open').lines[0]).toContain('Usage');
    });
  });
});
