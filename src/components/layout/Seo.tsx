import { useLocation } from 'react-router';
import { UI_LOCALES } from '@/i18n/config';

/** React 19 hoists <title>, <meta> and <link> into <head> automatically. */
export function Seo({ title, description }: { title: string; description?: string }) {
  const { pathname } = useLocation();
  const rest = pathname.split('/').slice(2).join('/');
  const origin = typeof window === 'undefined' ? '' : window.location.origin;

  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {UI_LOCALES.map((l) => (
        <link key={l.code} rel="alternate" hrefLang={l.code} href={`${origin}/${l.code}${rest ? `/${rest}` : ''}`} />
      ))}
    </>
  );
}
