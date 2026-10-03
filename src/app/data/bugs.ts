export interface SurvivedBug {
  slug: string;
  title: string;
  symptom: string;
  cause: string;
  fix: string;
  lesson: string;
  tags: readonly string[];
}

export const SURVIVED_BUGS: readonly SurvivedBug[] = [
  {
    slug: 'localhost-wrong-app',
    title: 'localhost:4200 shows the wrong app',
    symptom:
      'My Docker app was running on port 4200, but the browser kept showing another project.',
    cause:
      'A forgotten dev server was listening on the IPv6 address ::1:4200. The browser tries ::1 first for "localhost", so it never reached Docker on 0.0.0.0:4200.',
    fix: 'Found the process with Get-NetTCPConnection, stopped it, and gave each project its own port.',
    lesson: '"localhost" is not one address. One port per project saves hours.',
    tags: ['Docker', 'Networking', 'Windows'],
  },
  {
    slug: 'gcp-access-denied',
    title: 'GCP access denied',
    symptom: 'Every deploy command failed with "Permission denied" even though I was logged in.',
    cause: 'The CLI was using another account, and that account was missing an IAM role.',
    fix: 'Checked the active account with `gcloud auth list`, switched to the right one and asked for the missing role.',
    lesson: 'Read the full error: it usually names the missing permission.',
    tags: ['GCP', 'IAM', 'DevOps'],
  },
  {
    slug: 'npm-corporate-network',
    title: 'npm blocked by corporate network',
    symptom: '`npm install` hung forever, then failed with a certificate error.',
    cause:
      'The company proxy inspects HTTPS traffic with its own certificate, which npm did not trust.',
    fix: 'Configured the proxy in npm and pointed `cafile` to the company certificate.',
    lesson: 'When everything fails at the network level, ask IT before rewriting your setup.',
    tags: ['npm', 'Proxy', 'SSL'],
  },
  {
    slug: 'angular-component-from-hell',
    title: 'Angular component from hell',
    symptom: 'One component with 1000+ lines: every change broke something somewhere else.',
    cause: 'It fetched data, held all the state, handled the forms and rendered everything.',
    fix: 'Split it into small presentational components, moved the logic into a service and added tests before refactoring.',
    lesson: 'If a component needs scrolling to understand, it is doing too much.',
    tags: ['Angular', 'Refactoring', 'Architecture'],
  },
];
