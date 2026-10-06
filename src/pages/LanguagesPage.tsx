import { useTranslation } from 'react-i18next';
import { LANGUAGES, REGIONS } from '@/content/languages';
import { VERSES } from '@/content/verses';
import { useLanguageName } from '@/hooks/useLanguageName';
import { localePath, useLocale } from '@/i18n/useLocale';
import { Seo } from '@/components/layout/Seo';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { cn } from '@/lib/cn';
import { PageHeader } from './PageHeader';

const hasSample = (code: string) => Object.values(VERSES).some((v) => code in v.translations);

export default function LanguagesPage() {
  const { t } = useTranslation('pages');
  const { t: tc } = useTranslation();
  const { locale } = useLocale();
  const name = useLanguageName();

  return (
    <>
      <Seo title={t('languages.metaTitle')} description={t('languages.lead')} />
      <PageHeader eyebrow={t('languages.eyebrow')} title={t('languages.title')} lead={t('languages.lead')}>
        <ButtonLink to={localePath(locale, 'seventy')} variant="text">{t('languages.about')}</ButtonLink>
      </PageHeader>

      <Container className="flex flex-col gap-20 pb-32">
        {REGIONS.map((region) => {
          const items = LANGUAGES.filter((l) => l.region === region);
          if (!items.length) return null;
          return (
            <Reveal as="section" key={region} className="grid gap-8 lg:grid-cols-[16rem_1fr]">
              <h2 className="label pt-2 text-gold">
                {tc(`regions.${region}`)} <span className="text-navy/30">· {items.length}</span>
              </h2>
              <ul className="grid border-t border-navy/10 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-10">
                {items.map((l) => {
                  const available = hasSample(l.code);
                  return (
                    <li key={l.code} className="flex items-baseline justify-between gap-4 border-b border-navy/10 py-5">
                      <span className="flex flex-col gap-1">
                        <span lang={l.code} dir={l.dir} className="font-display text-2xl text-navy">{l.nativeName}</span>
                        <span className="text-xs text-navy/45">{name(l.code)}</span>
                      </span>
                      <span
                        className={cn('shrink-0 text-[10px] tracking-[0.2em] uppercase', available ? 'text-gold' : 'text-navy/30')}
                        title={available ? t('languages.available') : t('languages.inPreparation')}
                      >
                        {available ? '●' : '○'} <span className="sr-only">{available ? t('languages.available') : t('languages.inPreparation')}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          );
        })}
        <p className="flex gap-8 text-xs text-navy/50">
          <span><span className="text-gold">●</span> {t('languages.available')}</span>
          <span><span className="text-navy/30">○</span> {t('languages.inPreparation')}</span>
        </p>
      </Container>
    </>
  );
}
