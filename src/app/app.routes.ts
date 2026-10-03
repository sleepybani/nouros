import { CanMatchFn, Routes } from '@angular/router';
import { findAppByRoute } from './core/app-registry';
import { Shell } from './shell/shell/shell';

const isKnownApp: CanMatchFn = (_route, segments) => !!findAppByRoute(segments[0]?.path ?? '');

/**
 * Every URL renders the same Shell (desktop or mobile). The child routes only exist so
 * the router accepts `/projects` or `/projects/ev-on`; AppLauncher reads them.
 */
export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: ':appRoute', canMatch: [isKnownApp], children: [] },
      { path: ':appRoute/:slug', canMatch: [isKnownApp], children: [] },
    ],
  },
  { path: '**', redirectTo: '' },
];
