export interface WorkEntry {
  slug: string;
  title: string;
  /** One line. What it is, in the reader's terms. */
  summary: string;
  period: string;
  stack: readonly string[];
  /** Shown in the reference column of the ledger row. */
  reference: string;
  /** Partie is deliberately lighter than the county work. */
  weight: 'primary' | 'secondary';
}

export const WORK: readonly WorkEntry[] = [
  {
    slug: 'orange-county-property-tax',
    title: 'Orange County property tax',
    summary:
      'Replacing a 20-year-old classic ASP system that billed $9.7 billion, against a deadline set by statute.',
    period: '2024 — present',
    stack: ['Angular 20', '.NET 9', 'SQL Server', 'Azure DevOps'],
    reference: 'taxbill.octreasurer.gov',
    weight: 'primary',
  },
  {
    slug: 'tax-bill-admin',
    title: 'Tax Bill Admin',
    summary:
      'The internal service behind it: payment system of record, request signer, and the console that let county staff stop filing tickets with another department.',
    period: '2025 — present',
    stack: ['Angular', '.NET Core', 'SQL Server', 'Entra ID'],
    reference: 'Internal — no public surface',
    weight: 'primary',
  },
  {
    slug: 'partie',
    title: 'Partie',
    summary:
      'Real-time video and notification integrations for a consumer gaming platform.',
    period: '2020 — 2022',
    stack: ['Angular', 'ASP.NET Core', 'Agora', 'OneSignal'],
    reference: 'Company since closed',
    weight: 'secondary',
  },
];
