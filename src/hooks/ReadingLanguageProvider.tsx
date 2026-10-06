import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocale } from '@/i18n/useLocale';

/**
 * The reader's chosen *content* languages (one of the 70), independent of the UI locale.
 * `primary` drives single-translation views; `compare` drives the side-by-side view.
 */
interface ReadingLanguageState {
  primary: string;
  setPrimary: (code: string) => void;
  compare: string[];
  setCompare: (codes: string[]) => void;
}

const STORAGE_KEY = '70l.reading';
export const MAX_COMPARE = 3;

const ReadingLanguageContext = createContext<ReadingLanguageState | null>(null);

function readStored(): { primary?: string; compare?: string[] } {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function ReadingLanguageProvider({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  const [stored] = useState(readStored);
  const [primary, setPrimary] = useState<string>(stored.primary ?? locale);
  const [compare, setCompareState] = useState<string[]>(
    stored.compare ?? [...new Set([locale === 'he' ? 'en' : locale, 'en', 'zh'])],
  );

  const setCompare = useCallback(
    (codes: string[]) => setCompareState([...new Set(codes)].slice(0, MAX_COMPARE)),
    [],
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ primary, compare }));
    } catch {
      /* storage unavailable — keep state in memory only */
    }
  }, [primary, compare]);

  const value = useMemo(
    () => ({ primary, setPrimary, compare, setCompare }),
    [primary, compare, setCompare],
  );

  return <ReadingLanguageContext value={value}>{children}</ReadingLanguageContext>;
}

export function useReadingLanguage(): ReadingLanguageState {
  const ctx = use(ReadingLanguageContext);
  if (!ctx) throw new Error('useReadingLanguage must be used inside <ReadingLanguageProvider>');
  return ctx;
}
