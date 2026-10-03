import { TestBed } from '@angular/core/testing';
import { WindowManager } from './window-manager';

describe('WindowManager', () => {
  let windowManager: WindowManager;

  beforeEach(() => {
    windowManager = TestBed.inject(WindowManager);
  });

  it('starts with no open windows', () => {
    expect(windowManager.windows()).toEqual([]);
    expect(windowManager.focusedWindow()).toBeUndefined();
  });

  describe('open', () => {
    it('opens a window with the default size of the app', () => {
      windowManager.open('terminal');

      const [terminal] = windowManager.windows();
      expect(terminal.appId).toBe('terminal');
      expect(terminal.width).toBe(660);
      expect(terminal.height).toBe(420);
      expect(windowManager.isFocused('terminal')).toBe(true);
    });

    it('places each new window a bit lower and to the right of the previous one', () => {
      windowManager.open('terminal');
      windowManager.open('mail');

      const [terminal, mail] = windowManager.windows();
      expect(mail.x).toBeGreaterThan(terminal.x);
      expect(mail.y).toBeGreaterThan(terminal.y);
    });

    it('does not duplicate an already open window, but focuses it with the new params', () => {
      windowManager.open('explorer');
      windowManager.open('mail');
      windowManager.open('explorer', { slug: 'ev-on' });

      expect(windowManager.windows()).toHaveLength(2);
      expect(windowManager.focusedWindow()?.appId).toBe('explorer');
      expect(windowManager.focusedWindow()?.params).toEqual({ slug: 'ev-on' });
    });

    it('restores a minimized window', () => {
      windowManager.open('notes');
      windowManager.minimize('notes');
      windowManager.open('notes');

      expect(windowManager.windows()[0].minimized).toBe(false);
    });
  });

  describe('focus', () => {
    it('brings a background window to the front', () => {
      windowManager.open('terminal');
      windowManager.open('mail');

      windowManager.focus('terminal');

      expect(windowManager.focusedWindow()?.appId).toBe('terminal');
    });
  });

  describe('close', () => {
    it('removes the window and focuses the next one on top', () => {
      windowManager.open('terminal');
      windowManager.open('mail');

      windowManager.close('mail');

      expect(windowManager.isOpen('mail')).toBe(false);
      expect(windowManager.focusedWindow()?.appId).toBe('terminal');
    });
  });

  describe('minimize', () => {
    it('hides the window but keeps it open', () => {
      windowManager.open('paint');

      windowManager.minimize('paint');

      expect(windowManager.isOpen('paint')).toBe(true);
      expect(windowManager.focusedWindow()).toBeUndefined();
    });
  });

  describe('toggleFromTaskbar', () => {
    it('minimizes the focused window', () => {
      windowManager.open('games');

      windowManager.toggleFromTaskbar('games');

      expect(windowManager.windows()[0].minimized).toBe(true);
    });

    it('shows and focuses a window that is not focused', () => {
      windowManager.open('games');
      windowManager.minimize('games');

      windowManager.toggleFromTaskbar('games');

      expect(windowManager.isFocused('games')).toBe(true);
    });
  });

  describe('moveTo', () => {
    it('updates the window position', () => {
      windowManager.open('trash');

      windowManager.moveTo('trash', 300, 200);

      const [trash] = windowManager.windows();
      expect(trash.x).toBe(300);
      expect(trash.y).toBe(200);
    });
  });
});
