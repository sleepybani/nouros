import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SURVIVED_BUGS } from '../../data/bugs';
import { Trash } from './trash';

describe('Trash', () => {
  let fixture: ComponentFixture<Trash>;
  const page = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(Trash);
    await fixture.whenStable();
  });

  it('lists every survived bug, closed by default', () => {
    const bugs = page().querySelectorAll('details');

    expect(bugs).toHaveLength(SURVIVED_BUGS.length);
    expect(Array.from(bugs).every((bug) => !bug.open)).toBe(true);
  });

  it('shows symptom, cause, fix and lesson for each bug', () => {
    const firstBug = page().querySelector('details')!;

    expect(firstBug.textContent).toContain(SURVIVED_BUGS[0].symptom);
    expect(firstBug.textContent).toContain(SURVIVED_BUGS[0].lesson);
  });

  it('refuses to be emptied', async () => {
    page().querySelector<HTMLButtonElement>('.trash__empty')!.click();
    await fixture.whenStable();

    expect(page().querySelector('[role="status"]')?.textContent).toContain('Nope.');
    expect(page().querySelectorAll('details')).toHaveLength(SURVIVED_BUGS.length);
  });
});
