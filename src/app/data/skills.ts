export interface SkillGroup {
  name: string;
  skills: readonly string[];
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    name: 'Frontend',
    skills: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'SCSS', 'React', 'Next.js'],
  },
  {
    name: 'Backend',
    skills: ['NestJS', 'Node.js', 'Prisma', 'PostgreSQL', 'MySQL', 'REST APIs', 'JWT / Passport'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'Docker', 'AWS S3', 'Vercel', 'Vitest', 'Figma'],
  },
];

export const FUN_FACTS: readonly string[] = [
  'I paint when I need to think about something other than pixels.',
  'League of Legends taught me more about teamwork than most meetings.',
  'I dance to reset my brain after a long debugging session.',
  'My code runs on coffee, color and controlled chaos.',
];
