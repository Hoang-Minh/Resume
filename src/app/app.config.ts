import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  TitleStrategy,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { SeoTitleStrategy } from './seo';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    // Must come after provideRouter to displace the default strategy. Sets the
    // canonical URL and Open Graph tags per route, not just the title.
    { provide: TitleStrategy, useClass: SeoTitleStrategy },
    // No withEventReplay(): it emits an inline bootstrap script, which the
    // `script-src 'self'` policy in public/_headers blocks. The site is
    // prerendered content with one interactive control, so replaying clicks
    // that land before hydration buys far less than the CSP hole would cost.
    provideClientHydration(),
  ],
};
