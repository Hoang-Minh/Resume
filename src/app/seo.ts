import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { SITE } from './content/site';

/**
 * Per-route metadata, attached to each route's `data.seo`.
 *
 * Without it every prerendered page inherited the canonical URL and Open Graph
 * tags hard-coded in index.html — so all three case studies declared themselves
 * duplicates of the home page, and any shared case-study link rendered the home
 * page's card.
 */
export interface PageSeo {
  /** Path relative to the origin, leading slash, no trailing slash. */
  readonly path: string;
  /** The card headline. Usually shorter than the document title. */
  readonly ogTitle: string;
  readonly description: string;
}

/**
 * Sets the document title exactly as the default strategy does, then the tags
 * the default strategy knows nothing about.
 *
 * TitleStrategy is the hook rather than a router subscription in a component
 * because it also runs during prerendering, so the static HTML ships with the
 * right tags instead of correcting itself after hydration — which is too late
 * for a crawler or for a link unfurler, neither of which runs the app.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  override updateTitle(state: RouterStateSnapshot): void {
    const title = this.buildTitle(state);
    if (title !== undefined) {
      this.title.setTitle(title);
    }

    let route = state.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const seo = route.data['seo'] as PageSeo | undefined;
    if (seo) {
      this.apply(seo);
    }
  }

  private apply(seo: PageSeo): void {
    const url = SITE.origin + seo.path;

    this.canonical(url);

    // Explicit selectors: Meta matches on `name` by default, which would miss
    // these and append duplicates rather than update the existing tags.
    this.meta.updateTag({ property: 'og:url', content: url }, 'property="og:url"');
    this.meta.updateTag({ property: 'og:title', content: seo.ogTitle }, 'property="og:title"');
    this.meta.updateTag(
      { property: 'og:description', content: seo.description },
      'property="og:description"',
    );

    // index.html carries no plain description tag, so this one is created.
    this.meta.updateTag({ name: 'description', content: seo.description });
  }

  private canonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
