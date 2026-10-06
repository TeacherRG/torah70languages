import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { getLanguage } from '@/content/languages';
import { getVerse } from '@/content/verses';
import { localePath, useLocale } from '@/i18n/useLocale';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { cn } from '@/lib/cn';

/** Languages that rotate under the Hebrew line — never all 70 at once. */
const ROTATION = ['en', 'zh', 'ar', 'es', 'ru', 'hi', 'fr', 'de'] as const;
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

          <div className="min-h-[3.5rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={code}
                lang={code}
                dir={lang?.dir}
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-xl italic text-navy/70 sm:text-2xl"
              >
                {verse.translations[code]?.text}
              </motion.p>
            </AnimatePresence>
          </div>

          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-navy/40" aria-label={tc('nav.languages')}>
            {ROTATION.map((c, i) => (
              <li key={c} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true">·</span>}
                <button
                  type="button"
                  lang={c}
                  onClick={() => setIndex(i)}
                  className={cn('transition-colors duration-500', i === index ? 'text-gold' : 'hover:text-navy')}
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
