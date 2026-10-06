import { createBrowserRouter, redirect, type LoaderFunctionArgs } from 'react-router';
import i18n from '@/i18n';
import { DEFAULT_LOCALE, isUiLocale, NAMESPACES } from '@/i18n/config';
import { LocaleLayout } from '@/components/layout/LocaleLayout';
import { RouteError } from './RouteError';

/** Picks the best UI locale for a visitor without one in the URL. */
function detectLocale(): string {
  const detected = i18n.services.languageDetector?.detect();
  const candidates = (Array.isArray(detected) ? detected : [detected]).filter(Boolean) as string[];
  return candidates.map((c) => c.split('-')[0]).find(isUiLocale) ?? DEFAULT_LOCALE;
}

/**
 * Applies the locale from the URL *before* rendering, so there is no flash of
 * the wrong language. Unknown prefixes are treated as paths without a locale.
 */
async function localeLoader({ params, request }: LoaderFunctionArgs) {
  const { lng } = params;
  if (!isUiLocale(lng)) {
    const { pathname, search } = new URL(request.url);
    throw redirect(`/${detectLocale()}${pathname}${search}`);
  }
  if (i18n.resolvedLanguage !== lng) await i18n.changeLanguage(lng);
  await i18n.loadNamespaces([...NAMESPACES]);
  return null;
}

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect(`/${detectLocale()}`),
  },
  {
    path: '/:lng',
    loader: localeLoader,
    Component: LocaleLayout,
    ErrorBoundary: RouteError,
    HydrateFallback: () => null,
    children: [
      { index: true, lazy: () => import('@/pages/HomePage').then((m) => ({ Component: m.default })) },
      { path: 'texts', lazy: () => import('@/pages/TextsPage').then((m) => ({ Component: m.default })) },
      {
        path: 'texts/:passageId',
        lazy: () => import('@/pages/PassagePage').then((m) => ({ Component: m.default, loader: m.loader })),
      },
      { path: 'languages', lazy: () => import('@/pages/LanguagesPage').then((m) => ({ Component: m.default })) },
      { path: 'seventy', lazy: () => import('@/pages/SeventyPage').then((m) => ({ Component: m.default })) },
      { path: '*', lazy: () => import('@/pages/NotFoundPage').then((m) => ({ Component: () => <m.default /> })) },
    ],
  },
]);
