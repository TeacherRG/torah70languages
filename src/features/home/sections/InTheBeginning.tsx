import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/content/languages';
import { availableLanguages, getVerse } from '@/content/verses';
import { useReadingLanguage } from '@/hooks/ReadingLanguageProvider';
import { useLanguageName } from '@/hooks/useLanguageName';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { LanguageSelect } from '@/components/ui/LanguageSelect';
import { TranslationText } from '@/components/ui/TranslationText';

export function InTheBeginning() {
  const { t } = useTranslation('home');
  const { t: tc } = useTranslation();
  const name = useLanguageName();
  const { primary, setPrimary } = useReadingLanguage();
  const verse = getVerse('genesis-1-1');
  const options = availableLanguages(verse, LANGUAGES).filter((c) => c !== 'he');
  const current = options.includes(primary) ? primary : 'en';

  return (
    <section className="bg-paper py-28 lg:py-44">
      <Container className="flex flex-col gap-20">
        <Reveal>
          <h2 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-light leading-none">{t('beginning.title')}</h2>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal className="flex flex-col gap-6 lg:border-e lg:border-navy/10 lg:pe-24">
            <p className="label text-navy/40">{tc('reading.original')} · {tc('reading.hebrew')}</p>
            <p lang="he" dir="rtl" className="font-source text-4xl leading-snug text-navy sm:text-5xl">
              {verse.hebrew}
            </p>
            <p lang="he" dir="rtl" className="font-source text-lg text-gold">
              {verse.hebrewRef}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="flex flex-col gap-8">
            <LanguageSelect
              label={t('beginning.hint')}
              value={current}
              options={options}
              onChange={setPrimary}
              className="max-w-xs"
            />
            <p className="label text-navy/40">{name(current)}</p>
            <TranslationText verse={verse} code={current} className="text-3xl leading-snug sm:text-4xl" />
          </Reveal>
        </div>

        <Reveal>
          <p className="label text-center text-navy/40">{t('beginning.ref')}</p>
        </Reveal>
      </Container>
    </section>
  );
}
