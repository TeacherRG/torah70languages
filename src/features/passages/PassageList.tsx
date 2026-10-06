import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PASSAGES } from '@/content/passages';
import { localePath, useLocale } from '@/i18n/useLocale';
import { Arrow } from '@/components/ui/Arrow';
import { Reveal } from '@/components/ui/Reveal';

/** THE CORE as a numbered collection — not a list of lessons. */
export function PassageList({ withSummary = false }: { withSummary?: boolean }) {
  const { t } = useTranslation('passages');
  const { locale } = useLocale();

  return (
    <ol className="grid border-t border-navy/10 lg:grid-cols-2 lg:gap-x-16">
      {PASSAGES.map((p, i) => (
        <Reveal as="li" key={p.id} delay={(i % 2) * 0.08} className="border-b border-navy/10">
          <Link
            to={localePath(locale, `texts/${p.id}`)}
            className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 gap-y-2 py-7 transition-colors duration-500"
          >
            <span className="font-display text-lg text-gold">{p.number}</span>
            <span className="font-display text-2xl leading-tight text-navy transition-colors duration-500 group-hover:text-gold sm:text-3xl">
              {t(`${p.id}.title`)}
            </span>
            <Arrow className="text-navy/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold rtl:group-hover:-translate-x-1" />
            <span lang="he" dir="rtl" className="col-start-2 font-source text-base text-navy/45">
              {p.hebrewRef}
            </span>
            {withSummary && (
              <span className="col-start-2 max-w-md text-sm font-light leading-relaxed text-navy/60">
                {t(`${p.id}.summary`)}
              </span>
            )}
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}
