import { Component, input } from '@angular/core';
import { Project } from '../../data/projects';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail {
  readonly project = input.required<Project>();
}
