import { Routes } from '@angular/router';
import { PageSeo } from './seo';

/**
 * Literal paths rather than a `:slug` param — there are three case studies and
 * they are prerendered, so explicit routes save a getPrerenderParams hook and
 * make every URL discoverable at build time.
 *
 * `data.seo` is not optional in practice: a route without it keeps whatever tags
 * the previous page set. See SeoTitleStrategy.
 */
export const routes: Routes = [
  {
    path: '',
    title: 'Minh Nguyen — Senior Full Stack Developer, Angular and .NET',
    data: {
      seo: {
        path: '/',
        ogTitle: 'Minh Nguyen — Senior Full Stack Developer',
        description:
          "Angular and .NET. Orange County's property tax system: 886,000 bills, $9.7 billion, legacy application fully retired.",
      } satisfies PageSeo,
    },
    loadComponent: () => import('./pages/home').then((m) => m.Home),
  },
  {
    path: 'work/orange-county-property-tax',
    title: 'Replacing a 20-year-old property tax system — Minh Nguyen',
    data: {
      seo: {
        path: '/work/orange-county-property-tax',
        ogTitle: 'Replacing a 20-year-old property tax system',
        description:
          'Replacing the classic ASP system that billed 886,000 secured property tax bills totalling $9.7 billion, with Angular 20 and .NET 9, against a deadline set by statute.',
      } satisfies PageSeo,
    },
    loadComponent: () => import('./pages/cs-taxbill').then((m) => m.CsTaxbill),
  },
  {
    path: 'work/tax-bill-admin',
    title: 'Giving county staff the keys, safely — Minh Nguyen',
    data: {
      seo: {
        path: '/work/tax-bill-admin',
        ogTitle: 'Giving county staff the keys, safely',
        description:
          'The internal service behind the county tax bill system: payment system of record, request signer, and the console that let staff stop filing tickets with another department.',
      } satisfies PageSeo,
    },
    loadComponent: () => import('./pages/cs-admin').then((m) => m.CsAdmin),
  },
  {
    path: 'work/partie',
    title: 'Real-time video and notifications for a gaming platform — Minh Nguyen',
    data: {
      seo: {
        path: '/work/partie',
        ogTitle: 'Real-time video and notifications for a gaming platform',
        description:
          'Owning the Agora real-time video and OneSignal notification integrations end to end on a consumer gaming platform — including the part where it shipped and was not much used.',
      } satisfies PageSeo,
    },
    loadComponent: () => import('./pages/cs-partie').then((m) => m.CsPartie),
  },
  { path: '**', redirectTo: '' },
];
