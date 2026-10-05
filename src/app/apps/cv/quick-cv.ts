import { Component } from '@angular/core';
import { CV } from '../../data/cv';
import { PROFILE } from '../../data/profile';
import { PROJECTS } from '../../data/projects';
import { SKILL_GROUPS } from '../../data/skills';

@Component({
  selector: 'app-quick-cv',
  templateUrl: './quick-cv.html',
  styleUrl: './quick-cv.scss',
})
export class QuickCv {
  protected readonly cv = CV;
  protected readonly profile = PROFILE;
  protected readonly skillGroups = SKILL_GROUPS;
  protected readonly cvProjects = PROJECTS.filter((project) => !project.draft);

  protected print(): void {
    window.print();
  }
}
