import { Component, computed, inject } from '@angular/core';
import { AppLauncher } from '../../core/app-launcher';
import { APP_PARAMS } from '../../core/app-params';
import { findAppById } from '../../core/app-registry';
import { PROJECTS, findProjectBySlug } from '../../data/projects';
import { ProjectCard } from './project-card';
import { ProjectDetail } from './project-detail';

@Component({
  selector: 'app-explorer',
  imports: [ProjectCard, ProjectDetail],
  templateUrl: './explorer.html',
  styleUrl: './explorer.scss',
})
export class Explorer {
  private readonly launcher = inject(AppLauncher);
  private readonly appParams = inject(APP_PARAMS);
  private readonly explorerApp = findAppById('explorer');

  protected readonly projects = PROJECTS;
  protected readonly openedSlug = computed(() => this.appParams()['slug']);
  protected readonly openedProject = computed(() => {
    const slug = this.openedSlug();
    return slug ? findProjectBySlug(slug) : undefined;
  });
  protected readonly currentPath = computed(() =>
    ['~', 'projects', this.openedSlug()].filter(Boolean).join('/'),
  );

  protected openProject(slug: string): void {
    this.launcher.launch(this.explorerApp, slug);
  }

  protected backToProjects(): void {
    this.launcher.launch(this.explorerApp);
  }
}
