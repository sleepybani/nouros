import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BOOT_LINES, BootScreen } from './boot-screen';

describe('BootScreen', () => {
  let fixture: ComponentFixture<BootScreen>;
  let finishedCount: number;

  const page = () => fixture.nativeElement as HTMLElement;

  beforeEach(() => {
    vi.useFakeTimers();
    finishedCount = 0;
    fixture = TestBed.createComponent(BootScreen);
    fixture.componentInstance.finished.subscribe(() => finishedCount++);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with the "Starting NourOS…" message', () => {
    expect(page().textContent).toContain('Starting NourOS…');
    expect(page().querySelectorAll('.boot__lines li')).toHaveLength(0);
  });

  it('prints the boot lines one by one, then finishes by itself', () => {
    vi.advanceTimersByTime(350);
    fixture.detectChanges();
    expect(page().querySelectorAll('.boot__lines li')).toHaveLength(1);

    vi.advanceTimersByTime(5000);
    fixture.detectChanges();
    expect(page().querySelectorAll('.boot__lines li')).toHaveLength(BOOT_LINES.length);
    expect(finishedCount).toBe(1);
  });

  it('can be skipped with a click, and finishes only once', () => {
    page().click();
    vi.advanceTimersByTime(5000);

    expect(finishedCount).toBe(1);
  });

  it('can be skipped with any key', () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(finishedCount).toBe(1);
  });
});
