import { Outlet, ScrollRestoration } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ReadingLanguageProvider } from '@/hooks/ReadingLanguageProvider';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

/** Shell for every /:lng/* page. The locale itself is applied in the route loader (see app/router.tsx). */
export function LocaleLayout() {
  const { t } = useTranslation();
  return (
    <ReadingLanguageProvider>
      <a
        href="#main"
        className="sr-only z-50 bg-navy px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t('nav.skip')}
      </a>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </ReadingLanguageProvider>
  );
}
