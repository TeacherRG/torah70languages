import { useTranslation } from 'react-i18next';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { PassageList } from '@/features/passages/PassageList';

export function CoreCollection() {
  const { t } = useTranslation('home');
  return (
    <section id="core" className="bg-paper py-28 lg:py-44">
      <Container className="flex flex-col gap-16">
        <Reveal className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div className="flex flex-col gap-6">
            <Eyebrow>{t('core.eyebrow')}</Eyebrow>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] font-light uppercase leading-none tracking-[0.04em]">
              {t('core.title')}
            </h2>
          </div>
          <p className="max-w-md text-lg font-light text-navy/65 lg:justify-self-end">{t('core.body')}</p>
        </Reveal>
        <PassageList />
      </Container>
    </section>
  );
}
