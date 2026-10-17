import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../content/site';
import { EmailLink } from './email-link';

@Component({
  selector: 'mn-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmailLink],
  template: `
    <footer id="contact" class="foot">
      <div class="track track--doc">
        <p class="eyebrow">Contact</p>

        <div class="foot__grid">
          <div class="foot__lead">
            <p class="foot__pitch">
              I'm looking for senior full stack work in Angular and .NET.
              The fastest way to reach me is email.
            </p>
            <p class="foot__place">
              {{ site.location }} · {{ site.availability }}
            </p>
          </div>

          <ul class="foot__links">
            <li>
              <span class="foot__label">Email</span>
              <mn-email-link />
            </li>
            <li>
              <span class="foot__label">LinkedIn</span>
              <a [href]="site.linkedin">{{ site.linkedinLabel }}</a>
            </li>
            <li>
              <span class="foot__label">GitHub</span>
              <a [href]="site.github">{{ site.githubLabel }}</a>
            </li>
            <li>
              <span class="foot__label">Resume</span>
              <a [href]="site.resumePath">PDF</a>
            </li>
          </ul>
        </div>

        <p class="foot__colophon">
          Built in Angular, prerendered to static files. Type is Public Sans — the
          typeface of the US Web Design System — and Source Serif 4.
        </p>
      </div>
    </footer>
  `,
  styles: `
    .foot {
      border-top: 1px solid var(--rule);
      margin-top: 4rem;
      padding-block: 3.5rem 4rem;
    }

    .foot__grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
      gap: 2.5rem;
      margin-top: 1.4rem;
      align-items: start;
    }

    .foot__pitch {
      font-family: var(--font-text);
      font-size: var(--step-2);
      line-height: 1.45;
      max-width: 26ch;
    }

    .foot__place {
      margin-top: 0.9rem;
      font-size: var(--step--1);
      color: var(--ink-muted);
    }

    .foot__links {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 0.55rem;
    }

    .foot__links li {
      display: grid;
      grid-template-columns: 4.75rem minmax(0, 1fr);
      gap: 0.9rem;
      padding-block: 0.45rem;
      border-top: 1px solid var(--rule);
      align-items: baseline;
      font-size: var(--step--1);
    }

    .foot__label {
      font-size: var(--step--2);
      font-weight: 600;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      color: var(--ink-muted);
    }

    /* No max-width: the rule this paragraph draws has to span the same track as
       the grid above it, or it reads as a stray line rather than a divider.
       Width comes from the document track. */
    .foot__colophon {
      margin-top: 3rem;
      padding-top: 1.2rem;
      border-top: 1px solid var(--rule);
      font-size: var(--step--1);
      color: var(--ink-muted);
    }

    @media (max-width: 46rem) {
      .foot__grid {
        grid-template-columns: minmax(0, 1fr);
        gap: 2rem;
      }
    }
  `,
})
export class SiteFooter {
  protected readonly site = SITE;
}
