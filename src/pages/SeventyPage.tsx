import { useTranslation } from 'react-i18next';
import { Seo } from '@/components/layout/Seo';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { PageHeader } from './PageHeader';

/** The honest explanation: traditional "seventy languages" ≠ our modern seventy. */
export default function SeventyPage() {
  const { t } = useTranslation('pages');
  const sections = t('seventy.sections', { returnObjects: true });
  const sources = t('seventy.sourceList', { returnObjects: true });

  return (
    <>
      <Seo title={t('seventy.metaTitle')} description={t('seventy.lead')} />
      <PageHeader eyebrow={t('seventy.eyebrow')} title={t('seventy.title')} lead={t('seventy.lead')} />
      <Container className="grid gap-16 pb-32 lg:grid-cols-[1fr_16rem] lg:gap-24">
        <div className="flex flex-col">
          {sections.map((section, i) => (
            <Reveal as="section" key={section.title} className="grid gap-4 border-t border-navy/10 py-12 sm:grid-cols-[4rem_1fr]">
              <span className="font-display text-xl text-gold">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-3xl sm:text-4xl">{section.title}</h2>
                <p className="max-w-2xl text-lg font-light leading-relaxed text-navy/75 text-pretty">{section.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <aside className="flex flex-col gap-4 self-start border-t border-gold pt-6 lg:sticky lg:top-28">
          <p className="label text-navy">{t('seventy.sources')}</p>
          <ul className="flex flex-col gap-2 text-sm text-navy/60">
            {sources.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <p lang="he" dir="rtl" className="w-fit pt-6 font-source text-2xl text-gold">שבעים לשון</p>
        </aside>
      </Container>
    </>
  );
}
