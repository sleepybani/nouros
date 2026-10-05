export interface SkillGroup {
  name: string;
  skills: readonly string[];
}

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    name: 'Frontend',
    skills: ['Angular', 'TypeScript', 'RxJS', 'React', 'Vue.js', 'Nuxt', 'Tailwind CSS'],
  },
  {
    name: 'Backend',
    skills: ['NestJS', 'Node.js', 'Firebase', 'Cloud Functions', 'Prisma', 'Python'],
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'Cloud SQL', 'Bigtable'],
  },
  {
    name: 'Cloud & tools',
    skills: ['GCP', 'Docker', 'CI/CD', 'GitHub', 'Scrum'],
  },
  {
    name: 'Soft skills',
    skills: ['Communication', 'Mentoring', 'Autonomy', 'Collaboration', 'Rigor', 'Adaptability'],
  },
];

export const FUN_FACTS: readonly string[] = [
  'I won the Orange Summer Challenge 2021 with a project mentored by Google Australia.',
  'I paint when I need to think about something other than pixels.',
  'Dance and yoga reset my brain after a long debugging session.',
  'I care a lot about diversity in tech and ethical AI.',
  'My code runs on coffee, color and controlled chaos.',
];
