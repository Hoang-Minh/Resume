# minhnguyendev.com

Portfolio and case studies for Minh Nguyen — senior full stack developer, Angular and .NET.

Angular 21, prerendered to static HTML at build time, deployed to Cloudflare Pages.
No server, no runtime dependencies, no third-party requests.

## Running it

```bash
npm install
npm start          # dev server on http://localhost:4200
npm run build      # static output in dist/site/browser
npm test           # vitest
```

## How it's built

**Fully static.** `outputMode: "static"` in `angular.json` plus `RenderMode.Prerender` in
`src/app/app.routes.server.ts` renders every route to HTML at build time and emits no
server bundle. Routes are literal paths rather than a `:slug` param, so all four pages are
discoverable at build time without a `getPrerenderParams` hook.

**Zoneless.** No `zone.js`. State is signals throughout, and every component is
`OnPush` — which costs nothing here because there is almost no state to manage.

**Self-hosted fonts.** Public Sans and Source Serif 4 ship as variable fonts from
`@fontsource-variable`, wired through the `styles` array in `angular.json` so the bundler
fingerprints them. Nothing is fetched from a CDN, so the page makes no requests to any
host but its own — which is also what makes the strict CSP in `public/_headers` possible.

**The email address is never in the HTML.** `EmailLink` assembles it inside
`afterNextRender`, which does not run during prerendering. The built files contain the
parts and never the address, so a scraper reading the static HTML finds nothing.

## Layout

The case studies use a two-column document grid: a reading column, and a margin column
carrying where each claim came from. `DocBlock` (`src/app/ui/doc-block.ts`) is one row of
that grid, with content projected into the two slots. It collapses to a single column
below 60rem, where margin notes become indented asides.

```
src/app/
  content/     typed content — site details, work index, career history
  pages/       home and one component per case study
  ui/          header, footer, DocBlock, EmailLink
```

## Deploying

Cloudflare Pages:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist/site/browser` |
| Node version | 22 |

`public/_headers` sets the CSP and cache policy. `public/404.html` is served by Pages for
unknown paths. The apex domain requires Cloudflare nameservers — Pages cannot serve an
apex from external DNS.

## Accessibility

WCAG 2.1 AA is a requirement, not an aspiration: skip link, visible focus rings on a
non-default outline, semantic landmarks, `prefers-reduced-motion` honored, and a palette
checked for contrast in both light and dark. Dark mode follows the system preference and
also respects an explicit `data-theme` attribute.
