import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { DEFAULT_LOCALE, isUiLocale, localeDir, LOCALE_STORAGE_KEY, NAMESPACES, UI_LOCALES } from './config';

void i18n
  .use(LanguageDetector)
  // Every locale/namespace is its own code-split chunk, loaded on demand.
  // The /:lng route loader awaits them, so pages never render untranslated.
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => import(`../locales/${language}/${namespace}.json`),
    ),
  )
  .use(initReactI18next)
  .init({
    supportedLngs: UI_LOCALES.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    fallbackLng: DEFAULT_LOCALE,
    ns: [...NAMESPACES],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
      order: ['path', 'localStorage', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      lookupLocalStorage: LOCALE_STORAGE_KEY,
      caches: ['localStorage'],
    },
    react: { useSuspense: true },
  });

// Keep <html lang dir> in sync — drives RTL layout (Tailwind `rtl:` variant, logical properties).
i18n.on('languageChanged', (lng) => {
  const locale = isUiLocale(lng) ? lng : DEFAULT_LOCALE;
  document.documentElement.lang = locale;
  document.documentElement.dir = localeDir(locale);
});

export default i18n;
