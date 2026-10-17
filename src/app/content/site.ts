export const SITE = {
  /** Absolute origin for canonical URLs and Open Graph. No trailing slash. */
  origin: 'https://minhnguyendev.com',
  name: 'Minh Nguyen',
  role: 'Senior Full Stack Developer',
  location: 'Anaheim, CA',
  availability: 'Open to Orange County / remote',
  linkedin: 'https://www.linkedin.com/in/minh-nguyen-89289394/',
  linkedinLabel: 'linkedin.com/in/minh-nguyen',
  github: 'https://github.com/Hoang-Minh',
  githubLabel: 'github.com/Hoang-Minh',
  resumePath: '/minh-nguyen-resume.pdf',
} as const;

/**
 * Split so the address never appears as a contiguous string in the prerendered
 * HTML. Reassembled after hydration only — see EmailLink.
 */
export const EMAIL_PARTS = ['minhvuhoangnguyen', 'hotmail', 'com'] as const;
