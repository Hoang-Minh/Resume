import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './ui/site-header';
import { SiteFooter } from './ui/site-footer';

@Component({
  selector: 'mn-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  template: `
    <a href="#main" class="skip-link">Skip to content</a>
    <mn-site-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <mn-site-footer />
  `,
  styles: `
    main:focus {
      outline: none;
    }
  `,
})
export class App {}
