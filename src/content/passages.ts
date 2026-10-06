/**
 * THE CORE — the curated collection of 14 Torah passages.
 * Titles and descriptions live in src/locales/<ui>/passages.json under the same `id`.
 * `ref` uses Sefaria reference syntax and is used to fetch the Hebrew original.
 */
export interface Passage {
  id: PassageId;
  number: string;
  /** Hebrew citation, e.g. בראשית א–ב */
  hebrewRef: string;
  /** Sefaria reference used for the original text */
  ref: string;
  /** Key verse id (see src/content/verses) shown in previews, if available */
  keyVerse?: VerseId;
}

export type PassageId =
  | 'creation'
  | 'noah'
  | 'babel'
  | 'abraham'
  | 'akedah'
  | 'exodus'
  | 'song-of-the-sea'
  | 'sinai'
  | 'ten-commandments'
  | 'holiness'
  | 'priestly-blessing'
  | 'shema'
  | 'choose-life'
  | 'haazinu';

import type { VerseId } from './verses';

export const PASSAGES: readonly Passage[] = [
  { id: 'creation', number: '01', hebrewRef: 'בראשית א–ב', ref: 'Genesis 1:1-2:3', keyVerse: 'genesis-1-1' },
  { id: 'noah', number: '02', hebrewRef: 'בראשית ו–ט', ref: 'Genesis 9:8-17' },
  { id: 'babel', number: '03', hebrewRef: 'בראשית יא', ref: 'Genesis 11:1-9', keyVerse: 'genesis-11-1' },
  { id: 'abraham', number: '04', hebrewRef: 'בראשית יב', ref: 'Genesis 12:1-9' },
  { id: 'akedah', number: '05', hebrewRef: 'בראשית כב', ref: 'Genesis 22:1-19' },
  { id: 'exodus', number: '06', hebrewRef: 'שמות יב–יד', ref: 'Exodus 14:10-31' },
  { id: 'song-of-the-sea', number: '07', hebrewRef: 'שמות טו', ref: 'Exodus 15:1-21' },
  { id: 'sinai', number: '08', hebrewRef: 'שמות יט', ref: 'Exodus 19:1-25' },
  { id: 'ten-commandments', number: '09', hebrewRef: 'שמות כ', ref: 'Exodus 20:1-14' },
  { id: 'holiness', number: '10', hebrewRef: 'ויקרא יט', ref: 'Leviticus 19:1-18', keyVerse: 'leviticus-19-18' },
  { id: 'priestly-blessing', number: '11', hebrewRef: 'במדבר ו', ref: 'Numbers 6:22-27' },
  { id: 'shema', number: '12', hebrewRef: 'דברים ו', ref: 'Deuteronomy 6:4-9', keyVerse: 'deuteronomy-6-4' },
  { id: 'choose-life', number: '13', hebrewRef: 'דברים ל', ref: 'Deuteronomy 30:11-20' },
  { id: 'haazinu', number: '14', hebrewRef: 'דברים לב', ref: 'Deuteronomy 32:1-12' },
];

export function getPassage(id: string | undefined): Passage | undefined {
  return PASSAGES.find((p) => p.id === id);
}
