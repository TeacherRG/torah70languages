import { useTranslation } from 'react-i18next';
import { Seo } from '@/components/layout/Seo';
import { Container } from '@/components/ui/Container';
import { PassageList } from '@/features/passages/PassageList';
import { PageHeader } from './PageHeader';

export default function TextsPage() {
  const { t } = useTranslation('pages');
  return (
    <>
      <Seo title={t('texts.metaTitle')} description={t('texts.lead')} />
      <PageHeader eyebrow={t('texts.eyebrow')} title={<span className="uppercase tracking-[0.04em]">{t('texts.title')}</span>} lead={t('texts.lead')} />
      <Container className="pb-32">
        <PassageList withSummary />
      </Container>
    </>
  );
}
