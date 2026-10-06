import { useParams } from 'react-router';
import { DEFAULT_LOCALE, isUiLocale, localeDir, type UiLocale } from './config';

/** Current UI locale taken from the URL (/:lng/...). */
export function useLocale(): { locale: UiLocale; dir: 'ltr' | 'rtl' } {
  const { lng } = useParams();
  const locale = isUiLocale(lng) ? lng : DEFAULT_LOCALE;
  return { locale, dir: localeDir(locale) };
}

/** Builds a locale-prefixed path: localePath('ru', '/texts') → '/ru/texts'. */
export function localePath(locale: UiLocale, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}
