import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    const errorString = error?.message || error?.toString() || '';
    const isChunkFailed =
      /Loading chunk [\d]+ failed/i.test(errorString) ||
      /Failed to fetch dynamically imported module/i.test(errorString) ||
      /Importing a module script failed/i.test(errorString) ||
      /error loading dynamically imported module/i.test(errorString);

    if (isChunkFailed) {
      const lastReload = sessionStorage.getItem('chunk_reload_retry');
      const now = Date.now();

      // Guard against infinite reload loops (only reload once per 10 seconds)
      if (!lastReload || now - Number(lastReload) > 10000) {
        sessionStorage.setItem('chunk_reload_retry', String(now));
        console.warn('[CacheBuster] New application version detected after deployment. Reloading...');
        window.location.reload();
        return;
      }
    }

    console.error('[GlobalErrorHandler]', error);
  }
}
