/**
 * Interface (UI) locales — the languages the website chrome is available in.
 * NOTE: these are different from the 70 *content* languages (see src/content/languages.ts).
 * To add a UI locale: add it here and create src/locales/<code>/*.json with the same keys.
 */
export const UI_LOCALES = [
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'ru', label: 'Русский', short: 'RU', dir: 'ltr' },
  { code: 'he', label: 'עברית', short: 'עב', dir: 'rtl' },
] as const;

export type UiLocale = (typeof UI_LOCALES)[number]['code'];

export const DEFAULT_LOCALE: UiLocale = 'en';

export const NAMESPACES = ['common', 'home', 'passages', 'pages'] as const;
export type Namespace = (typeof NAMESPACES)[number];

export const LOCALE_STORAGE_KEY = '70l.locale';

export function isUiLocale(value: string | undefined): value is UiLocale {
  return UI_LOCALES.some((l) => l.code === value);
}

export function localeDir(locale: UiLocale): 'ltr' | 'rtl' {
  return UI_LOCALES.find((l) => l.code === locale)?.dir ?? 'ltr';
}
