import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { localePath, useLocale } from '@/i18n/useLocale';
import { Container } from '@/components/ui/Container';

export function SiteFooter() {
  const { t } = useTranslation();
  const { locale } = useLocale();

  return (
    <footer className="border-t border-navy/10 bg-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <p dir="ltr" className="w-fit text-[13px] font-medium tracking-[0.28em]">{t('brand.name')}</p>
          <p className="max-w-sm font-display text-2xl leading-snug text-navy/80">{t('footer.slogan')}</p>
          <p lang="he" dir="rtl" className="w-fit font-source text-gold">
            שבעים לשון. מילה אחת.
          </p>
        </div>
        <nav className="flex flex-col gap-3 text-sm text-navy/60">
          <Link className="hover:text-gold" to={localePath(locale, 'texts')}>{t('nav.texts')}</Link>
          <Link className="hover:text-gold" to={localePath(locale, 'languages')}>{t('nav.languages')}</Link>
          <Link className="hover:text-gold" to={localePath(locale, 'seventy')}>{t('nav.seventy')}</Link>
        </nav>
        <div className="flex flex-col gap-3 text-sm text-navy/45">
          <a className="hover:text-gold" href="https://www.sefaria.org" target="_blank" rel="noopener noreferrer">
            {t('footer.sources')}
          </a>
          <p>{t('footer.rights', { year: new Date().getFullYear() })}</p>
        </div>
      </Container>
    </footer>
  );
}
