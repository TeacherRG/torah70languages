import { useCallback, useMemo } from 'react';
import { getLanguage } from '@/content/languages';
import { useLocale } from '@/i18n/useLocale';

/**
 * Returns a function that names a content language in the current UI locale,
 * using the platform's Intl.DisplayNames — no need to translate 70 names × N locales by hand.
 */
export function useLanguageName() {
  const { locale } = useLocale();
  const displayNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([locale], { type: 'language' });
    } catch {
      return undefined;
    }
  }, [locale]);

  return useCallback(
    (code: string) => {
      const name = displayNames?.of(code);
      if (name && name !== code) return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
      return getLanguage(code)?.englishName ?? code;
    },
    [displayNames, locale],
  );
}
