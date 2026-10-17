import { afterNextRender, ChangeDetectionStrategy, Component, signal } from '@angular/core';

export type Theme = 'system' | 'light' | 'dark';

/** Shared with the pre-paint script in index.html. Changing it breaks that. */
const STORAGE_KEY = 'mn-theme';

interface ThemeOption {
  readonly value: Theme;
  readonly label: string;
}

/**
 * Three-state colour control. 'system' removes the attribute and lets the
 * prefers-color-scheme block in styles.scss decide; the other two pin it.
 *
 * The attribute is set before first paint by an inline script in index.html —
 * this component only reads back what that script already decided, so there is
 * no flash of the wrong theme on load.
 */
@Component({
  selector: 'mn-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="themer" role="group" aria-label="Colour theme">
      @for (option of options; track option.value) {
        <button
          type="button"
          class="themer__btn"
          [class.is-on]="theme() === option.value"
          [attr.aria-pressed]="theme() === option.value"
          (click)="select(option.value)"
        >
          <span class="visually-hidden">{{ option.label }}</span>
          @switch (option.value) {
            @case ('system') {
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <circle cx="8" cy="8" r="5.75" fill="none" stroke="currentColor" stroke-width="1.4" />
                <path d="M8 2.25a5.75 5.75 0 0 1 0 11.5z" fill="currentColor" />
              </svg>
            }
            @case ('light') {
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.4" />
                <path
                  d="M8 .9v1.9M8 13.2v1.9M15.1 8h-1.9M2.8 8H.9M13 3l-1.35 1.35M4.35 11.65 3 13M13 13l-1.35-1.35M4.35 4.35 3 3"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="round"
                />
              </svg>
            }
            @case ('dark') {
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <path
                  d="M13.4 9.6A5.9 5.9 0 0 1 6.4 2.6a5.9 5.9 0 1 0 7 7z"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linejoin="round"
                />
              </svg>
            }
          }
        </button>
      }
    </div>
  `,
  styles: `
    .themer {
      display: inline-flex;
      border: 1px solid var(--rule);
      border-radius: var(--radius);
    }

    .themer__btn {
      display: grid;
      place-items: center;
      width: 2.1rem;
      height: 1.8rem;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--ink-muted);
      cursor: pointer;
      transition: background-color 120ms ease, color 120ms ease;
    }

    .themer__btn + .themer__btn {
      border-left: 1px solid var(--rule);
    }

    .themer__btn:hover {
      color: var(--accent);
    }

    .themer__btn.is-on {
      background: var(--accent-wash);
      color: var(--accent);
    }
  `,
})
export class ThemeToggle {
  protected readonly options: readonly ThemeOption[] = [
    { value: 'system', label: 'Match system' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  protected readonly theme = signal<Theme>('system');

  constructor() {
    // Browser only: on the server there is no stored preference to read.
    //
    // Applying as well as reading is deliberate. theme-init.js has normally
    // done this already and this is a no-op — but if it did not run, setting
    // the signal alone would leave the control showing Dark over a light page.
    // A late theme is a flash; a control that disagrees with the page is a bug.
    afterNextRender(() => {
      const stored = read();
      this.theme.set(stored);
      apply(stored);
    });
  }

  protected select(next: Theme): void {
    this.theme.set(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode, or storage disabled. The choice still applies for this page.
    }
  }
}

function read(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // Unreadable storage is indistinguishable from no preference.
  }
  return 'system';
}

function apply(theme: Theme): void {
  const root = document.documentElement;

  if (theme === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }

  syncBrowserChrome(theme);
}

/**
 * The theme-color metas in index.html are keyed to prefers-color-scheme, which
 * an explicit choice has to override — otherwise mobile browser chrome keeps
 * following the OS while the page does not. Pinning a theme collapses both
 * metas onto that colour; returning to 'system' hands them back their media
 * queries rather than freezing whatever the OS happened to be at that moment.
 */
function syncBrowserChrome(theme: Theme): void {
  const light = document.querySelector('#theme-color-light');
  const dark = document.querySelector('#theme-color-dark');
  if (!light || !dark) {
    return;
  }

  if (theme === 'system') {
    light.setAttribute('media', '(prefers-color-scheme: light)');
    light.setAttribute('content', '#f4f5f3');
    dark.setAttribute('media', '(prefers-color-scheme: dark)');
    dark.setAttribute('content', '#0f1315');
    return;
  }

  const color = theme === 'dark' ? '#0f1315' : '#f4f5f3';
  for (const meta of [light, dark]) {
    meta.removeAttribute('media');
    meta.setAttribute('content', color);
  }
}
