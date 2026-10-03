import { Component, signal } from '@angular/core';
import { SURVIVED_BUGS } from '../../data/bugs';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.html',
  styleUrl: './trash.scss',
})
export class Trash {
  protected readonly bugs = SURVIVED_BUGS;
  protected readonly refusedToEmpty = signal(false);
}
