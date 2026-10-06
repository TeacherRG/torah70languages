# 70 LANGUAGES

> Ancient words. One humanity. · שבעים לשון — אחדות אחת

A premium cultural & technology project: selected passages of the Torah presented in the world's languages —
read in your language, compare with another, discover the original.

## Stack

| Concern        | Library |
| -------------- | ------- |
| UI             | React 19 (+ native `<title>/<meta>` hoisting) |
| Build          | Vite 8, TypeScript 7 |
| Routing        | React Router 8 (data router, lazy routes, loaders, `<Await>` streaming) |
| i18n           | i18next + react-i18next, lazy-loaded namespaces, typed keys |
| Styling        | Tailwind CSS 4 (`@theme` design tokens, `rtl:` variant, logical properties) |
| Motion         | Motion (`motion/react`), respects `prefers-reduced-motion` |
| Fonts          | Cormorant Garamond (display), Inter (UI), Frank Ruhl Libre (Hebrew source), Noto Sans Hebrew (Hebrew UI) |

```bash
npm install
npm run dev          # http://localhost:5173 → redirects to /en, /ru or /he
npm run build        # typecheck + production build
npm run check:i18n   # verify every UI locale has the same keys as English
```

## Two kinds of "language"

1. **UI locales** — the site chrome (`en`, `ru`, `he` with RTL). Configured in `src/i18n/config.ts`,
   strings in `src/locales/<locale>/<namespace>.json`. URLs are prefixed: `/ru/texts/shema`.
2. **Content languages** — the 70 languages of the translations, in `src/content/languages.ts`.
   Their localized names come from `Intl.DisplayNames`, so they never need manual translation.

The reader's chosen content languages (primary + up to 3 for comparison) are kept in
`ReadingLanguageProvider`, independent of the UI locale.

## Structure

```
src/
  app/                 router (locale loader, lazy routes), App, error boundary
  i18n/                i18next setup, locale config, typed keys, useLocale/localePath
  locales/{en,ru,he}/  common · home · passages · pages  (English = source of truth)
  content/
    languages.ts       the 70 content languages (code, native name, dir, region)
    passages.ts        THE CORE — 14 passages (Sefaria refs, Hebrew citations)
    verses/*.json      verses: Hebrew original + translations by language code
  components/
    layout/            header, footer, locale switcher, SEO, locale layout
    ui/                Container, ButtonLink, Arrow, Reveal, LanguageSelect, TranslationText…
  features/
    home/sections/     the 7 screens of the concept (Hero → Compare)
    compare/           side-by-side translation comparison
    passages/          collection list, Sefaria client
  hooks/               reading-language context, Intl language names
  pages/               Home, Texts, Passage, Languages, Seventy (“Why seventy?”), 404
legacy/                the previous static site (kept for reference)
```

## Adding things

- **A UI locale**: add it to `UI_LOCALES` and copy `src/locales/en` → `src/locales/<code>`; run `npm run check:i18n`.
- **A translation**: add `"<langCode>": { "text": "…", "source": "…" }` to a file in `src/content/verses/`.
- **A verse**: create a JSON file there and register it in `src/content/verses/index.ts`.

Translations in `src/content/verses` are working drafts based on public-domain / reference renderings and
must be reviewed by native speakers before publication. As the corpus grows (14 passages × 70 languages),
move them to `public/texts/<passageId>/<lang>.json` and load them on demand.

## Deployment

It is a single-page app: the host must serve `index.html` for unknown paths (SPA fallback).
