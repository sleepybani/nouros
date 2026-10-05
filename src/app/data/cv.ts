export interface CvEntry {
  title: string;
  place: string;
  period: string;
  highlights: readonly string[];
}

export const CV = {
  headline: 'Full-stack JavaScript engineer — Angular · NestJS · GCP',
  summary:
    'Full-stack engineer on EVO-ON, an industrial project for Sidel: first as a SFEIR consultant in 2022, then hired by Sidel in March 2023 for the same role. I am the technical lead on several critical modules: I design and ship features, keep the code healthy, write the documentation, mentor interns and new developers, and take part in technical interviews. I am also training to become a manager. What drives me: staying up to date, high technical standards, and helping teams grow, both technically and as people.',
  experience: [
    {
      title: 'Full-stack engineer',
      place: 'Sidel, Strasbourg',
      period: 'Mar 2023 – now',
      highlights: [
        'Technical lead on several critical modules of EVO-ON.',
        'Design and development of complex features.',
        'Mentoring and onboarding of interns and new developers.',
        'Helping the PO write, clarify and prioritize functional specifications.',
        'Continuous improvement: refactoring, optimization, long-term reliability.',
        'Technical documentation: architecture, patterns, best practices.',
        'Coordination with internal and external teams for a stable delivery.',
        'Technical interviews for recruitment.',
      ],
    },
    {
      title: 'Full-stack engineer (consultant)',
      place: 'SFEIR for Sidel, Strasbourg',
      period: 'Feb 2022 – Mar 2023',
      highlights: [
        'Joined the EVO-ON project for Sidel, then hired by Sidel for the same role.',
        'Diversity and inclusion initiatives at SFEIR: articles, talks, events.',
      ],
    },
    {
      title: 'Web developer intern',
      place: 'SNCF, Strasbourg',
      period: 'Nov 2021 – Jan 2022',
      highlights: [
        'Vibration analysis system for the predictive maintenance of industrial equipment.',
        'Data processing modules and analysis models in Python.',
        'Internal React app to anticipate anomalies and plan interventions.',
      ],
    },
    {
      title: 'Web developer',
      place: 'Orange, Tunisia',
      period: 'Jul 2021 – Oct 2021',
      highlights: [
        'Best project award for Sisley France at the Orange Summer Challenge 2021.',
        'App to increase the collection and recycling of plastic waste, with startup potential.',
        'Worked with a Google (Australia) mentor on technical scope, UX and product strategy.',
        'Full prototype: Angular, Firebase, Cloud Functions, real time, analytics.',
        'Agile team, client coordination, MVP presented to an international jury.',
      ],
    },
    {
      title: 'Developer and CERT member intern',
      place: 'EY, Tunisia',
      period: 'Jul 2020 – Aug 2020',
      highlights: [
        'Web scraping app with Python and Scrapy.',
        'Cyber threat analysis with the CSIRT team.',
      ],
    },
    {
      title: 'Web developer intern',
      place: 'OneTech, Tunisia',
      period: 'Jul 2019 – Aug 2019',
      highlights: ['Web app to manage network equipment (PHP, HTML/CSS, Bootstrap, SQL).'],
    },
  ] as readonly CvEntry[],
  education: [
    {
      title: 'Software engineering program',
      place: "CESI École d'Ingénieurs, Strasbourg",
      period: 'Sep 2021 – Feb 2022',
      highlights: [],
    },
    {
      title: 'Engineering degree, Web and Internet Technologies',
      place: 'ESPRIT, Tunisia',
      period: 'Sep 2017 – Aug 2022',
      highlights: [],
    },
  ] as readonly CvEntry[],
  awards: [
    'Orange Summer Challenge 2021 — best project (for Sisley France, with Google Australia).',
    'Best project at the ESPRIT "Bal des Projets" (2018 and 2019).',
  ],
  languages: ['French — fluent', 'English — fluent', 'Arabic — intermediate'],
  /** Path in /public, e.g. 'cv/nour-cv.pdf'. Empty = only the print button is shown. */
  pdfUrl: '',
};
