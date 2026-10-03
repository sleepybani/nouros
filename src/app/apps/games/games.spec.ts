import { TestBed } from '@angular/core/testing';
import { HOBBIES } from '../../data/creative';
import { Games } from './games';

describe('Games', () => {
  it('lists every hobby', async () => {
    const fixture = TestBed.createComponent(Games);
    await fixture.whenStable();
    const hobbyNames = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.games__name'),
    ).map((name) => name.textContent);

    expect(hobbyNames).toEqual(HOBBIES.map((hobby) => hobby.name));
  });
});
