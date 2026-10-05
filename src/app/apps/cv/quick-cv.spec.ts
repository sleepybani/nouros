import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CV } from '../../data/cv';
import { PROJECTS } from '../../data/projects';
import { QuickCv } from './quick-cv';

describe('QuickCv', () => {
  let fixture: ComponentFixture<QuickCv>;
  const page = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(QuickCv);
    await fixture.whenStable();
  });

  it('shows the full name, headline and skills', () => {
    expect(page().querySelector('.cv__name')?.textContent).toBe('Nour Khedher');
    expect(page().querySelector('.cv__headline')?.textContent).toContain('Full-stack');
    expect(page().querySelector('.cv__skills')?.textContent).toContain('NestJS');
  });

  it('lists every job with its highlights', () => {
    const jobTitles = Array.from(page().querySelectorAll('.cv__entry-title strong')).map(
      (title) => title.textContent,
    );

    expect(jobTitles).toContain('Full-stack engineer');
    expect(page().textContent).toContain('Mar 2023 – now');
    expect(page().textContent).toContain(CV.experience[0].highlights[0]);
  });

  it('shows the awards', () => {
    expect(page().textContent).toContain('Orange Summer Challenge 2021');
  });

  it('only shows finished projects, not drafts', () => {
    const finishedProjects = PROJECTS.filter((project) => !project.draft);
    const projectsSection = Array.from(page().querySelectorAll('.cv__section')).find((section) =>
      section.querySelector('h4')?.textContent?.includes('Selected projects'),
    )!;

    expect(projectsSection.querySelectorAll('li')).toHaveLength(finishedProjects.length);
    expect(projectsSection.textContent).not.toContain('coming soon');
  });

  it('prints the CV', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => undefined);

    page().querySelector<HTMLButtonElement>('.cv__button--secondary')!.click();

    expect(printSpy).toHaveBeenCalled();
  });
});
