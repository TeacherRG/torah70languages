import 'i18next';
import type common from '@/locales/en/common.json';
import type home from '@/locales/en/home.json';
import type passages from '@/locales/en/passages.json';
import type pages from '@/locales/en/pages.json';

// Type-safe translation keys: English is the source of truth.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      home: typeof home;
      passages: typeof passages;
      pages: typeof pages;
    };
  }
}
