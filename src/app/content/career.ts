export interface Role {
  title: string;
  org: string;
  period: string;
  note?: string;
}

export interface TimelineEntry {
  employer: string;
  period: string;
  /** Continuous county work spans two employers. Both are named. */
  roles: readonly Role[];
  detail: string;
}

export const TIMELINE: readonly TimelineEntry[] = [
  {
    employer: 'County of Orange',
    period: '2022 — present',
    roles: [
      {
        title: 'Senior Application Developer',
        org: 'Orange County IT',
        period: 'Jan 2023 — present',
      },
      {
        title: 'Senior Application Developer',
        org: 'Collabera, contracted to SAIC',
        period: 'May 2022 — Jan 2023',
      },
    ],
    detail:
      'Supporting the Orange County Treasurer-Tax Collector, and applications across multiple county agencies. Led the property tax system replacement and have been its sole developer since launch.',
  },
  {
    employer: 'Partie Partners LLC',
    period: '2020 — 2022',
    roles: [{ title: 'Full Stack Developer', org: 'Partie', period: 'Nov 2020 — May 2022' }],
    detail:
      'Consumer gaming platform. Owned the Agora real-time video and OneSignal notification integrations end to end, on a team of six.',
  },
  {
    employer: 'CCC Information Services',
    period: '2018 — 2020',
    roles: [
      { title: 'Software Development Engineer', org: 'CCC', period: 'Apr 2018 — Jul 2020' },
    ],
    detail:
      'Built and maintained an internal MEAN-stack application the engineering team used daily to compose queries, trigger builds, and report results. Automation frameworks for Android and iOS in .NET.',
  },
  {
    employer: 'Schneider Electric',
    period: '2016 — 2018',
    roles: [
      { title: 'Software Automation Engineer', org: 'Schneider', period: 'Mar 2016 — Apr 2018' },
    ],
    detail:
      'PowerShell and Python tooling, a headless Node.js framework, SQL Server development, and test environment infrastructure.',
  },
];

export interface SkillTier {
  label: string;
  note: string;
  items: readonly string[];
}

export const SKILLS: readonly SkillTier[] = [
  {
    label: 'Daily',
    note: 'What I work in now',
    items: ['Angular', 'TypeScript', 'C# / .NET', 'SQL Server', 'Azure DevOps'],
  },
  {
    label: 'Production experience',
    note: 'Shipped and maintained, not currently daily',
    items: [
      'Kubernetes',
      'Node / Express',
      'MongoDB',
      'RxJS',
      'CI/CD',
      'Microservices',
      'Payment integrations',
    ],
  },
  {
    label: 'Earlier',
    note: 'Used in previous roles',
    items: ['React', 'Appium', 'PowerShell', 'Python'],
  },
];

export interface SideProject {
  name: string;
  detail: string;
  repo: string;
  repoLabel: string;
}

export const SIDE_PROJECTS: readonly SideProject[] = [
  {
    name: 'Real-time chat',
    detail: 'Node, Express, MongoDB, Socket.IO, Cloudinary',
    repo: 'https://github.com/Hoang-Minh/chat_app',
    repoLabel: 'Hoang-Minh/chat_app',
  },
  {
    name: 'Travel blog with mapping',
    detail: 'MERN, Mapbox',
    repo: 'https://github.com/Hoang-Minh/mern_travel_blog',
    repoLabel: 'Hoang-Minh/mern_travel_blog',
  },
];
