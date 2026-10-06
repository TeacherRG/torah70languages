import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { UI_LOCALES } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { cn } from '@/lib/cn';

/** Switches the interface language while keeping the current page. */
export function LocaleSwitcher({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { pathname, search, hash } = useLocation();
  const rest = pathname.split('/').slice(2).join('/');

  return (
    <nav aria-label={t('locale.label')} className={cn('flex items-center gap-1', className)}>
      {UI_LOCALES.map((l) => (
        <Link
          key={l.code}
          to={`/${l.code}${rest ? `/${rest}` : ''}${search}${hash}`}
          lang={l.code}
          hrefLang={l.code}
          title={l.label}
          aria-current={l.code === locale ? 'true' : undefined}
          className={cn(
            'px-2 py-1 text-[11px] tracking-[0.18em] transition-colors',
            l.code === locale ? 'text-navy' : 'text-navy/40 hover:text-gold',
          )}
        >
          {l.short}
        </Link>
      ))}
    </nav>
  );
}
