import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { getLanguage, LANGUAGES } from '@/content/languages';
import { availableLanguages, getVerse } from '@/content/verses';
import { localePath, useLocale } from '@/i18n/useLocale';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { cn } from '@/lib/cn';

/** Every available translation of the first line, one at a time — never all 70 at once. */
const ROTATION = availableLanguages(getVerse('genesis-1-1'), LANGUAGES).filter((c) => c !== 'he');
/** Quick-pick languages shown as a row under the rotating line. */
const SHORTCUTS = ['en', 'zh', 'ar', 'es', 'ru', 'hi', 'fr', 'de'];
const INTERVAL_MS = 3600;

export function Hero() {
  const { t } = useTranslation('home');
  const { t: tc } = useTranslation();
  const { locale } = useLocale();
  const reduce = useReducedMotion();
  const verse = getVerse('genesis-1-1');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % ROTATION.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const code = ROTATION[index];
  const lang = getLanguage(code);

  return (
    <section className="relative overflow-hidden">
      <Container className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center gap-12 py-20 lg:py-28">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="label text-gold"
        >
          {t('hero.eyebrow')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl font-display text-[clamp(3rem,9vw,8.5rem)] font-light leading-[0.95] tracking-[-0.02em] text-navy text-balance"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="max-w-xl text-lg font-light leading-relaxed text-navy/70 text-pretty"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="flex flex-col gap-5 border-t border-navy/10 pt-10"
        >
          <p lang="he" dir="rtl" className="w-fit font-source text-2xl text-navy sm:text-3xl">
            {verse.hebrew}
          </p>

          <div className="min-h-[5.5rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={code}
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-2"
              >
              <p className="label text-gold" lang={code}>
                {lang?.nativeName} <span className="text-navy/30">· {index + 1} / {ROTATION.length}</span>
              </p>
              <p
                lang={code}
                dir={lang?.dir}
                className="font-display text-xl italic text-navy/70 sm:text-2xl"
              >
                {verse.translations[code]?.text}
              </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-navy/40" aria-label={tc('nav.languages')}>
            {SHORTCUTS.map((c, i) => (
              <li key={c} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true">·</span>}
                <button
                  type="button"
                  lang={c}
                  onClick={() => setIndex(ROTATION.indexOf(c))}
                  className={cn('transition-colors duration-500', c === code ? 'text-gold' : 'hover:text-navy')}
                >
                  {getLanguage(c)?.nativeName}
                </button>
              </li>
            ))}
          </ul>
          <p className="label text-navy/35">{t('hero.verseRef')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="flex flex-wrap gap-4"
        >
          <ButtonLink to={localePath(locale, 'texts')}>{tc('actions.explore')}</ButtonLink>
          <ButtonLink to={localePath(locale, 'languages')} variant="secondary">
            {tc('actions.theLanguages')}
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}
