const BOOTED_KEY = 'nouros:booted';

/** The boot animation plays once per browser tab session. Storage can be blocked, so never trust it blindly. */
export function hasBootedThisSession(): boolean {
  try {
    return sessionStorage.getItem(BOOTED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function rememberBootedThisSession(): void {
  try {
    sessionStorage.setItem(BOOTED_KEY, 'true');
  } catch {
    // Private mode or blocked storage: the boot will simply play again next time.
  }
}

export function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}
