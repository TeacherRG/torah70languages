import { useTranslation } from 'react-i18next';
import { localePath, useLocale } from '@/i18n/useLocale';
import { Seo } from '@/components/layout/Seo';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { PageHeader } from './PageHeader';

export default function NotFoundPage({ message }: { message?: string }) {
  const { t } = useTranslation('pages');
  const { locale } = useLocale();
  return (
    <>
      <Seo title={t('notFound.metaTitle')} />
      <PageHeader eyebrow="404" title={message ?? t('notFound.title')}>
        <div className="pb-24">
          <ButtonLink to={localePath(locale)}>{t('notFound.back')}</ButtonLink>
        </div>
      </PageHeader>
    </>
  );
}
