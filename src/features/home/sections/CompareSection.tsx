import { useTranslation } from 'react-i18next';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { CompareTranslations } from '@/features/compare/CompareTranslations';

export function CompareSection() {
  const { t } = useTranslation('home');
  return (
    <section id="compare" className="py-28 lg:py-44">
      <Container className="flex flex-col gap-16">
        <Reveal className="flex max-w-2xl flex-col gap-6">
          <Eyebrow>{t('compare.eyebrow')}</Eyebrow>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-none">{t('compare.title')}</h2>
          <p className="text-lg font-light text-navy/65">{t('compare.body')}</p>
        </Reveal>
        <CompareTranslations />
      </Container>
    </section>
  );
}
