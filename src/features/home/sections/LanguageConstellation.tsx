import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'motion/react';
import { FEATURED_LANGUAGES } from '@/content/languages';
import { localePath, useLocale } from '@/i18n/useLocale';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { cn } from '@/lib/cn';

/** Deterministic rhythm of sizes so the cloud feels composed, not random. */
const SIZES = [
  'text-4xl sm:text-5xl text-navy',
  'text-xl sm:text-2xl text-navy/60',
  'text-2xl sm:text-3xl text-navy/80',
  'text-lg text-navy/45',
  'text-3xl sm:text-4xl text-navy/70',
];

export function LanguageConstellation() {
  const { t } = useTranslation('home');
  const { t: tc } = useTranslation();
  const { locale } = useLocale();
  const reduce = useReducedMotion();
  const half = Math.ceil(FEATURED_LANGUAGES.length / 2);

  const word = (code: string, nativeName: string, dir: string, i: number) => (
    <motion.li
      key={code}
      lang={code}
      dir={dir}
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: (i % 10) * 0.06 }}
      className={cn('font-display leading-none', SIZES[i % SIZES.length])}
    >
      {nativeName}
    </motion.li>
  );

  return (
    <section className="py-28 lg:py-44">
      <Container className="flex flex-col items-center gap-16 text-center">
        <Eyebrow>{t('languages.eyebrow')}</Eyebrow>

        <ul className="flex max-w-5xl flex-wrap items-baseline justify-center gap-x-10 gap-y-6">
          {FEATURED_LANGUAGES.slice(0, half).map((l, i) => word(l.code, l.nativeName, l.dir, i))}
          <li className="flex w-full flex-col items-center py-10">
            <span className="font-display text-[clamp(6rem,18vw,14rem)] font-light leading-[0.85] text-navy">
              {t('languages.count')}
            </span>
            <span className="label text-gold">{t('languages.label')}</span>
          </li>
          {FEATURED_LANGUAGES.slice(half).map((l, i) => word(l.code, l.nativeName, l.dir, i + half))}
        </ul>

        <ButtonLink to={localePath(locale, 'languages')} variant="secondary" arrow>
          {tc('actions.viewAll')}
        </ButtonLink>
      </Container>
    </section>
  );
}
