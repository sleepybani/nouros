export interface CvEntry {
  title: string;
  place: string;
  period: string;
  description: string;
}

export const CV = {
  headline: 'Full-stack JavaScript developer — Angular · NestJS · TypeScript',
  summary:
    'I build clear, accessible interfaces and the APIs behind them. I care about readable code, good UX and shipping small steps. On the creative side: painting, writing and dancing.',
  experience: [] as readonly CvEntry[],
  education: [] as readonly CvEntry[],
  languages: ['French', 'English'],
  /** Path in /public, e.g. 'cv/nour-cv.pdf'. Empty = only the print button is shown. */
  pdfUrl: '',
};
