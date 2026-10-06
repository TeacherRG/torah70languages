import { useTranslation } from 'react-i18next';
import { getLanguage } from '@/content/languages';
import type { Verse } from '@/content/verses';
import { cn } from '@/lib/cn';

/** Renders one verse translation with correct lang/dir, or a graceful placeholder. */
export function TranslationText({
  verse,
  code,
  className,
  showSource = true,
}: {
  verse: Verse;
  code: string;
  className?: string;
  showSource?: boolean;
}) {
  const { t } = useTranslation();
  const translation = verse.translations[code];
  const language = getLanguage(code);

  if (!translation) {
    return <p className="font-display text-xl italic text-navy/40">{t('reading.pending')}</p>;
  }

  return (
    <figure className="flex flex-col gap-4">
      <blockquote lang={code} dir={language?.dir ?? 'auto'} className={cn('font-display text-navy', className)}>
        {translation.text}
      </blockquote>
      {showSource && (
        <figcaption className="text-xs text-navy/45">
          {translation.source ? t('reading.source', { source: translation.source }) : t('reading.draft')}
        </figcaption>
      )}
    </figure>
  );
}
