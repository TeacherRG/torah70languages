import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';
import { localePath, useLocale } from '@/i18n/useLocale';
import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/Container';
import { LocaleSwitcher } from './LocaleSwitcher';

export function SiteHeader() {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { to: localePath(locale, 'texts'), label: t('nav.texts') },
    { to: localePath(locale, 'languages'), label: t('nav.languages') },
    { to: localePath(locale, 'seventy'), label: t('nav.seventy') },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn('transition-colors duration-300', isActive ? 'text-navy' : 'text-navy/55 hover:text-gold');

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-ivory/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link to={localePath(locale)} className="group flex items-baseline gap-3" aria-label={t('nav.home')}>
          <span dir="ltr" className="text-[13px] font-medium tracking-[0.28em] text-navy">{t('brand.name')}</span>
          <span lang="he" dir="rtl" className="hidden font-source text-sm text-gold sm:inline">
            {t('brand.hebrew')}
          </span>
        </Link>

        <nav aria-label={t('nav.primary')} className="hidden items-center gap-10 text-sm md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitcher className="hidden sm:flex" />
          <button
            type="button"
            className="label text-navy md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-navy/10 md:hidden"
          >
            <Container className="flex flex-col gap-6 py-8">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} className={(s) => cn(linkClass(s), 'font-display text-3xl')}>
                  {link.label}
                </NavLink>
              ))}
              <LocaleSwitcher className="-ms-2 pt-2" />
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
