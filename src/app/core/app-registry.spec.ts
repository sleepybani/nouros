import { OS_APPS, findAppById, findAppByRoute } from './app-registry';

describe('app registry', () => {
  it('has unique ids and routes', () => {
    const ids = OS_APPS.map((app) => app.id);
    const routes = OS_APPS.map((app) => app.route);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it('keeps the desktop to 6 icons max', () => {
    const desktopApps = OS_APPS.filter((app) => app.placement === 'desktop');
    expect(desktopApps.length).toBeLessThanOrEqual(6);
  });

  it('finds an app by id', () => {
    expect(findAppById('mail').route).toBe('contact');
  });

  it('finds an app by route', () => {
    expect(findAppByRoute('projects')?.id).toBe('explorer');
    expect(findAppByRoute('does-not-exist')).toBeUndefined();
  });
});
