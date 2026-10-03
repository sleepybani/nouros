import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PROJECTS } from '../../data/projects';
import { QuickCv } from './quick-cv';

describe('QuickCv', () => {
  let fixture: ComponentFixture<QuickCv>;
  const page = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(QuickCv);
    await fixture.whenStable();
  });

  it('shows the headline, skills and every project', () => {
    expect(page().querySelector('.cv__headline')?.textContent).toContain('Full-stack');
    expect(page().querySelector('.cv__skills')?.textContent).toContain('NestJS');
    expect(page().querySelectorAll('.cv__projects li')).toHaveLength(PROJECTS.length);
  });

  it('hides empty sections', () => {
    expect(page().textContent).not.toContain('Experience');
    expect(page().textContent).not.toContain('Education');
  });

  it('prints the CV', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => undefined);

    page().querySelector<HTMLButtonElement>('.cv__button--secondary')!.click();

    expect(printSpy).toHaveBeenCalled();
  });
});
