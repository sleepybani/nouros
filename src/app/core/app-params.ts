import { InjectionToken, Signal } from '@angular/core';
import { AppParams } from './os-app';

/** Route params of the window an app is rendered in, e.g. `{ slug: 'ev-on' }` for /projects/ev-on. */
export const APP_PARAMS = new InjectionToken<Signal<AppParams>>('APP_PARAMS');
