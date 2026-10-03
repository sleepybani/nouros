import { AppId, OsApp } from './os-app';

export const OS_APPS: readonly OsApp[] = [
  {
    id: 'explorer',
    title: 'Explorer',
    subtitle: 'Projects',
    icon: 'icons/explorer.svg',
    route: 'projects',
    placement: 'desktop',
    defaultSize: { width: 780, height: 540 },
    loadComponent: () => import('../apps/explorer/explorer').then((m) => m.Explorer),
  },
  {
    id: 'terminal',
    title: 'Terminal',
    subtitle: 'Who am I?',
    icon: 'icons/terminal.svg',
    route: 'terminal',
    placement: 'desktop',
    defaultSize: { width: 660, height: 420 },
    loadComponent: () => import('../apps/terminal/terminal').then((m) => m.Terminal),
  },
  {
    id: 'mail',
    title: 'Mail',
    subtitle: 'Contact me',
    icon: 'icons/mail.svg',
    route: 'contact',
    placement: 'desktop',
    defaultSize: { width: 580, height: 540 },
    loadComponent: () => import('../apps/mail/mail').then((m) => m.Mail),
  },
  {
    id: 'notes',
    title: 'Notes',
    subtitle: 'Blog',
    icon: 'icons/notes.svg',
    route: 'notes',
    placement: 'desktop',
    defaultSize: { width: 740, height: 540 },
    loadComponent: () => import('../apps/notes/notes').then((m) => m.Notes),
  },
  {
    id: 'paint',
    title: 'Paint.exe',
    subtitle: 'Creative side',
    icon: 'icons/paint.svg',
    route: 'paint',
    placement: 'desktop',
    defaultSize: { width: 780, height: 560 },
    loadComponent: () => import('../apps/paint/paint').then((m) => m.Paint),
  },
  {
    id: 'games',
    title: 'Games',
    subtitle: 'Personality',
    icon: 'icons/games.svg',
    route: 'games',
    placement: 'desktop',
    defaultSize: { width: 560, height: 460 },
    loadComponent: () => import('../apps/games/games').then((m) => m.Games),
  },
  {
    id: 'trash',
    title: 'Trash',
    subtitle: 'Bugs I survived',
    icon: 'icons/trash.svg',
    route: 'trash',
    placement: 'corner',
    defaultSize: { width: 640, height: 500 },
    loadComponent: () => import('../apps/trash/trash').then((m) => m.Trash),
  },
  {
    id: 'cv',
    title: 'Quick CV',
    subtitle: 'Resume',
    icon: 'icons/cv.svg',
    route: 'cv',
    placement: 'taskbar',
    defaultSize: { width: 700, height: 620 },
    loadComponent: () => import('../apps/cv/quick-cv').then((m) => m.QuickCv),
  },
];

export function findAppById(appId: AppId): OsApp {
  const app = OS_APPS.find((candidate) => candidate.id === appId);
  if (!app) {
    throw new Error(`Unknown app id: ${appId}`);
  }
  return app;
}

export function findAppByRoute(route: string): OsApp | undefined {
  return OS_APPS.find((candidate) => candidate.route === route);
}
