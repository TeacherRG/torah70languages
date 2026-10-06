/**
 * Hebrew original from the Sefaria public API (https://developers.sefaria.org).
 * Results are cached in memory for the session.
 */
export interface SefariaVerse {
  chapter: number;
  verse: number;
  text: string;
}

const cache = new Map<string, Promise<SefariaVerse[]>>();

function stripMarkup(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('sup, i.footnote').forEach((el) => el.remove());
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
}

/** Parses the start of a reference like "Genesis 1:1-2:3" → { chapter: 1, verse: 1 }. */
function parseStart(ref: string): { chapter: number; verse: number } {
  const match = ref.match(/(\d+):(\d+)/);
  return match ? { chapter: Number(match[1]), verse: Number(match[2]) } : { chapter: 1, verse: 1 };
}

async function load(ref: string, signal?: AbortSignal): Promise<SefariaVerse[]> {
  const url = `https://www.sefaria.org/api/texts/${encodeURIComponent(ref)}?context=0&commentary=0&pad=0`;
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Sefaria responded ${response.status}`);
  const data: { he?: unknown } = await response.json();
  const start = parseStart(ref);

  // Single-chapter ranges return string[]; multi-chapter ranges return string[][].
  const chapters: unknown[][] = Array.isArray(data.he) && Array.isArray(data.he[0]) ? (data.he as unknown[][]) : [Array.isArray(data.he) ? data.he : [data.he]];

  const verses = chapters.flatMap((chapter, ci) =>
    chapter.map((text, vi) => ({
      chapter: start.chapter + ci,
      verse: (ci === 0 ? start.verse : 1) + vi,
      text: stripMarkup(String(text ?? '')),
    })),
  ).filter((v) => v.text);

  if (!verses.length) throw new Error('Hebrew text unavailable');
  return verses;
}

export function fetchHebrew(ref: string): Promise<SefariaVerse[]> {
  let promise = cache.get(ref);
  if (!promise) {
    promise = load(ref);
    promise.catch(() => cache.delete(ref));
    cache.set(ref, promise);
  }
  return promise;
}

export const sefariaUrl = (ref: string) => `https://www.sefaria.org/${ref.replace(/\s+/g, '_').replace(/:/g, '.')}`;
