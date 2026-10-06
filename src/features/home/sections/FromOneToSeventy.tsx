import { useTranslation } from 'react-i18next';
import { localePath, useLocale } from '@/i18n/useLocale';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { BranchingTree } from './BranchingTree';

export function FromOneToSeventy() {
  const { t } = useTranslation('home');
  const { locale } = useLocale();

  return (
    <section className="py-28 lg:py-44">
      <Container className="flex flex-col items-center gap-14 text-center">
        <Reveal>
          <h2 className="label flex flex-col gap-3 text-base tracking-[0.4em] text-navy sm:text-lg">
            <span>{t('branching.from')}</span>
            <span className="text-gold">{t('branching.to')}</span>
          </h2>
        </Reveal>

        <div className="w-full max-w-4xl">
          <BranchingTree rootLabel={t('branching.root')} />
          <p className="label -mt-2 text-navy">{t('branching.worlds')}</p>
        </div>

        <Reveal className="flex max-w-2xl flex-col items-center gap-6">
          <p className="font-display text-2xl leading-snug text-navy/85 sm:text-3xl text-balance">
            {t('branching.body')}
          </p>
          <p className="text-xs tracking-[0.2em] text-navy/45">{t('branching.sources')}</p>
          <ButtonLink to={localePath(locale, 'seventy')} variant="text">
            {t('branching.more')}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
