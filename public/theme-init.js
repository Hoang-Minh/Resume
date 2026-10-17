/**
 * Applies a pinned colour theme before first paint.
 *
 * External rather than inline so it satisfies `script-src 'self'` in
 * public/_headers — an inline script is blocked there, which silently leaves the
 * page on the system theme while the control claims otherwise.
 *
 * Must stay render-blocking. Adding defer or async lets one frame of the wrong
 * palette through, which is the entire thing this file exists to prevent.
 *
 * The storage key and the two colours are shared with ThemeToggle
 * (src/app/ui/theme-toggle.ts). Changing them here means changing them there.
 */
(function () {
  try {
    var theme = localStorage.getItem('mn-theme');
    if (theme !== 'light' && theme !== 'dark') {
      return;
    }

    document.documentElement.setAttribute('data-theme', theme);

    // The theme-color metas are keyed to prefers-color-scheme, which an explicit
    // choice overrides; without this the mobile browser chrome follows the OS
    // while the page does not.
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) {
      metas[i].removeAttribute('media');
      metas[i].setAttribute('content', theme === 'dark' ? '#0f1315' : '#f4f5f3');
    }
  } catch (e) {
    // Storage unavailable (private mode, blocked cookies). Fall through to the
    // system theme rather than breaking the page.
  }
})();
