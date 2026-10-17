import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * One row of the document: the reading column, and the margin column that
 * carries where a claim came from.
 *
 * Each block owns its own grid so column widths stay identical down the page
 * without every block having to participate in one shared grid.
 *
 * Usage:
 *   <mn-block>
 *     <p>A claim.</p>
 *     <div ref>Where it came from.</div>
 *   </mn-block>
 */
@Component({
  selector: 'mn-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="block" [class.block--ruled]="ruled()">
      <div class="block__main"><ng-content /></div>
      <aside class="block__ref"><ng-content select="[ref]" /></aside>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    :host + :host {
      margin-top: 1.6rem;
    }

    .block {
      display: grid;
      grid-template-columns: minmax(0, var(--measure)) minmax(0, var(--margin-col));
      column-gap: 3rem;
      align-items: start;
    }

    .block__ref {
      font-family: var(--font-ui);
      font-size: var(--step--1);
      line-height: 1.5;
      color: var(--ink-muted);
      font-variant-numeric: tabular-nums;
      padding-top: 0.4rem;
      border-top: 1px solid var(--rule);
    }

    .block__ref:empty {
      border-top: 0;
    }

    /* For stacked lists, the rule spans both columns — a rule over only the margin
       note reads as a mistake rather than a divider. */
    .block--ruled {
      border-top: 1px solid var(--rule);
      padding-top: 1.3rem;
    }

    .block--ruled .block__ref {
      border-top: 0;
      padding-top: 0;
    }

    :host:has(.block--ruled) + :host {
      margin-top: 2rem;
    }

    @media (max-width: 60rem) {
      .block {
        grid-template-columns: minmax(0, 1fr);
        row-gap: 0.9rem;
      }

      .block__ref:not(:empty) {
        margin-top: 1rem;
        padding-left: 0.9rem;
        padding-top: 0;
        border-top: 0;
        border-left: 2px solid var(--rule-strong);
      }
    }
  `,
})
export class DocBlock {
  /** Draw a divider across both columns. Use for stacked lists, not for prose. */
  readonly ruled = input(false, { transform: booleanAttribute });
}
