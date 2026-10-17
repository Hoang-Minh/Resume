import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../content/site';
import { ThemeToggle } from './theme-toggle';

@Component({
  selector: 'mn-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ThemeToggle],
  template: `
    <header class="bar">
      <div class="shell bar__inner">
        <a routerLink="/" class="bar__name">{{ site.name }}</a>

        <div class="bar__end">
          <nav class="bar__nav" aria-label="Primary">
            <a routerLink="/" fragment="work">Work</a>
            <a [href]="site.resumePath">Resume</a>
            <a routerLink="/" fragment="contact">Contact</a>
          </nav>
          <mn-theme-toggle />
        </div>
      </div>
    </header>
  `,
  styles: `
    /* The record's running head: a system label, so it stays quiet even as the
       masthead below it grows. */
    .bar {
      border-bottom: 1px solid var(--rule);
      background: var(--paper);
    }

    .bar__inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem 1.5rem;
      padding-block: 0.9rem;
    }

    .bar__name {
      font-size: var(--step--1);
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      text-decoration: none;
    }

    .bar__end {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .bar__nav {
      display: flex;
      gap: 1.4rem;
      font-size: var(--step--1);
      letter-spacing: 0.02em;
    }

    .bar__nav a {
      text-decoration: none;
      color: var(--ink-muted);
    }

    .bar__nav a:hover,
    .bar__nav a.is-current {
      color: var(--accent);
    }

    @media (max-width: 30rem) {
      .bar__end {
        width: 100%;
        justify-content: space-between;
        gap: 1rem;
      }

      .bar__nav {
        gap: 1.1rem;
      }
    }
  `,
})
export class SiteHeader {
  protected readonly site = SITE;
}
