import { InjectionToken, Signal } from '@angular/core';
import { AppParams } from './os-app';

/** Route params of the window an app is rendered in, e.g. `{ slug: 'evo-on' }` for /projects/evo-on. */
export const APP_PARAMS = new InjectionToken<Signal<AppParams>>('APP_PARAMS');
