import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';
import { LANGUAGES } from '@/content/languages';
import { availableLanguages, getVerse, type VerseId } from '@/content/verses';
import { MAX_COMPARE, useReadingLanguage } from '@/hooks/ReadingLanguageProvider';
import { useLanguageName } from '@/hooks/useLanguageName';
import { LanguageSelect } from '@/components/ui/LanguageSelect';
import { TranslationText } from '@/components/ui/TranslationText';
import { cn } from '@/lib/cn';

const COMPARE_VERSES: VerseId[] = ['deuteronomy-6-4', 'genesis-1-1', 'genesis-11-1', 'leviticus-19-18'];

/**
 * The signature feature: one verse, the Hebrew original, and up to three
 * languages side by side.
 */
export function CompareTranslations({ initialVerse = 'deuteronomy-6-4' }: { initialVerse?: VerseId }) {
  const { t } = useTranslation('home');
  const name = useLanguageName();
  const { compare, setCompare } = useReadingLanguage();
  const [verseId, setVerseId] = useState<VerseId>(initialVerse);
  const verse = getVerse(verseId);
  const options = availableLanguages(verse, LANGUAGES).filter((c) => c !== 'he');

  const replaceAt = (index: number, code: string) =>
    setCompare(compare.map((c, i) => (i === index ? code : c)));
  const removeAt = (index: number) => setCompare(compare.filter((_, i) => i !== index));
  const add = () => {
    const next = options.find((c) => !compare.includes(c));
    if (next) setCompare([...compare, next]);
  };

  return (
    <div className="flex flex-col gap-14">
      <div role="tablist" aria-label={t('compare.verse')} className="flex flex-wrap gap-2">
        {COMPARE_VERSES.map((id) => {
          const v = getVerse(id);
          const selected = id === verseId;
          return (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setVerseId(id)}
              className={cn(
                'border px-4 py-2 font-source text-sm transition-colors duration-300',
                selected ? 'border-navy bg-navy text-paper' : 'border-navy/15 text-navy/60 hover:border-gold',
              )}
              lang="he"
              dir="rtl"
            >
              {v.hebrewRef}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={verseId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-14"
        >
          <p lang="he" dir="rtl" className="border-b border-navy/10 pb-12 text-center font-source text-4xl leading-snug sm:text-6xl">
            {verse.hebrew}
          </p>

          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {compare.map((code, index) => (
              <div key={`${index}-${code}`} className="flex flex-col gap-6">
                <div className="flex items-end gap-3">
                  <LanguageSelect
                    label={name(code)}
                    hideLabel
                    value={code}
                    options={options.includes(code) ? options : [code, ...options]}
                    onChange={(c) => replaceAt(index, c)}
                    className="flex-1"
                  />
                  {compare.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAt(index)}
                      aria-label={t('compare.remove', { language: name(code) })}
                      className="pb-2 text-lg leading-none text-navy/35 hover:text-terracotta"
                    >
                      ×
                    </button>
                  )}
                </div>
                <TranslationText verse={verse} code={code} className="text-2xl leading-snug" />
              </div>
            ))}

            {compare.length < MAX_COMPARE && (
              <button
                type="button"
                onClick={add}
                className="flex min-h-40 flex-col items-center justify-center gap-2 border border-dashed border-navy/20 text-navy/50 transition-colors hover:border-gold hover:text-gold"
              >
                <span className="text-2xl font-light">+</span>
                <span className="label">{t('compare.add')}</span>
                <span className="text-xs">{t('compare.limit', { count: MAX_COMPARE })}</span>
              </button>
            )}
          </div>

          <p className="label text-center text-navy/40">{verse.ref}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
