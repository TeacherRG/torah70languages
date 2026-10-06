/**
 * Verse store.
 *
 * Each verse lives in its own JSON file: { id, ref, hebrewRef, hebrew, translations: { [langCode]: { text, source? } } }.
 * Translations here are WORKING DRAFTS based on public-domain / reference renderings and must be
 * reviewed by native-speaking translators before publication.
 *
 * Scaling plan: when the corpus grows (14 passages × 70 languages), move translations to
 * /public/texts/<passageId>/<lang>.json and load them on demand (see README).
 */
import genesis_1_1 from './genesis-1-1.json';
import genesis_11_1 from './genesis-11-1.json';
import leviticus_19_18 from './leviticus-19-18.json';
import deuteronomy_6_4 from './deuteronomy-6-4.json';

export interface VerseTranslation {
  text: string;
  source?: string;
}

export interface Verse {
  id: string;
  ref: string;
  hebrewRef: string;
  hebrew: string;
  translations: Record<string, VerseTranslation | undefined>;
}

export const VERSES = {
  'genesis-1-1': genesis_1_1,
  'genesis-11-1': genesis_11_1,
  'leviticus-19-18': leviticus_19_18,
  'deuteronomy-6-4': deuteronomy_6_4,
} satisfies Record<string, Verse>;

export type VerseId = keyof typeof VERSES;

export function getVerse(id: VerseId): Verse {
  return VERSES[id];
}

/** Language codes that have a translation of the given verse, in the canonical 70-language order. */
export function availableLanguages(verse: Verse, order: readonly { code: string }[]): string[] {
  return order.map((l) => l.code).filter((code) => verse.translations[code]);
}
