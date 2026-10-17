import { EMAIL_PARTS } from './site';
import { WORK } from './work';
import { routes } from '../app.routes';

describe('email obfuscation', () => {
  // Asserted part by part, never as the assembled address. A test that spelled
  // out `user@host.tld` would be the one harvestable copy in a public repo —
  // harvesters match a regex over raw files, and this file is served as one.
  it('carries the expected parts', () => {
    expect(EMAIL_PARTS).toEqual(['minhvuhoangnguyen', 'hotmail', 'com']);
  });

  // The point of splitting the address is that no single string in the bundle can
  // be harvested. Collapsing the parts back into one constant would defeat it
  // silently, so guard the invariant rather than the convenience.
  it('keeps every part unharvestable on its own', () => {
    for (const part of EMAIL_PARTS) {
      expect(part).not.toContain('@');
      expect(part).not.toMatch(/\w+\.\w+/);
    }
  });
});

describe('work index', () => {
  it('points every entry at a route that exists', () => {
    const paths = new Set(routes.map((route) => route.path));
    for (const entry of WORK) {
      expect(paths.has(`work/${entry.slug}`)).toBe(true);
    }
  });

  it('leads with the county work', () => {
    expect(WORK[0].slug).toBe('orange-county-property-tax');
    expect(WORK.filter((entry) => entry.weight === 'primary')).toHaveLength(2);
  });
});
