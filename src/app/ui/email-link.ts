import { ChangeDetectionStrategy, Component, afterNextRender, signal } from '@angular/core';
import { EMAIL_PARTS } from '../content/site';

/**
 * The address is assembled in the browser only. `afterNextRender` does not run
 * during prerendering, so the built HTML ships the parts and never the address —
 * a scraper reading the static file finds nothing to harvest.
 */
@Component({
  selector: 'mn-email-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (address(); as email) {
      <a [href]="'mailto:' + email" class="email">{{ email }}</a>
    } @else {
      <span class="email email--pending">Email</span>
    }
  `,
  styles: `
    .email {
      font-variant-numeric: tabular-nums;
      /* Break at the @ or a dot rather than mid-word. */
      overflow-wrap: break-word;
      hyphens: none;
    }

    .email--pending {
      color: var(--ink-muted);
    }
  `,
})
export class EmailLink {
  protected readonly address = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      const [user, host, tld] = EMAIL_PARTS;
      this.address.set(`${user}@${host}.${tld}`);
    });
  }
}
