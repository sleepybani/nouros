import { CanMatchFn, Routes } from '@angular/router';
import { findAppByRoute } from './core/app-registry';
import { Desktop } from './shell/desktop/desktop';

const isKnownApp: CanMatchFn = (_route, segments) => !!findAppByRoute(segments[0]?.path ?? '');

/**
 * Every URL renders the same Desktop component. The child routes only exist so
 * the router accepts `/projects` or `/projects/ev-on`; AppLauncher reads them.
 */
export const routes: Routes = [
  {
    path: '',
    component: Desktop,
    children: [
      { path: ':appRoute', canMatch: [isKnownApp], children: [] },
      { path: ':appRoute/:slug', canMatch: [isKnownApp], children: [] },
    ],
  },
  { path: '**', redirectTo: '' },
];
