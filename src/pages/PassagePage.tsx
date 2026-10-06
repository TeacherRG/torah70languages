import { Suspense } from 'react';
import { Await, Link, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '@/content/languages';
import { getPassage, PASSAGES } from '@/content/passages';
import { availableLanguages, getVerse } from '@/content/verses';
import { fetchHebrew, sefariaUrl, type SefariaVerse } from '@/features/passages/sefaria';
import { useReadingLanguage } from '@/hooks/ReadingLanguageProvider';
import { localePath, useLocale } from '@/i18n/useLocale';
import { toHebrewNumeral } from '@/lib/hebrewNumerals';
import { Seo } from '@/components/layout/Seo';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { LanguageSelect } from '@/components/ui/LanguageSelect';
import { TranslationText } from '@/components/ui/TranslationText';
import NotFoundPage from './NotFoundPage';

export function loader({ params }: LoaderFunctionArgs) {
  const passage = getPassage(params.passageId);
  // The Hebrew text streams in: the page renders immediately, the text resolves inside <Await>.
  return { passage, hebrew: passage ? fetchHebrew(passage.ref) : null };
}

export default function PassagePage() {
  const { passage, hebrew } = useLoaderData<typeof loader>();
  const { t } = useTranslation('pages');
  const { t: tp } = useTranslation('passages');
  const { t: tc } = useTranslation();
  const { locale } = useLocale();
  const { primary, setPrimary } = useReadingLanguage();

  if (!passage || !hebrew) return <NotFoundPage message={t('passage.notFound')} />;

  const index = PASSAGES.indexOf(passage);
  const prev = PASSAGES[index - 1];
  const next = PASSAGES[index + 1];
  const keyVerse = passage.keyVerse ? getVerse(passage.keyVerse) : undefined;
  const keyOptions = keyVerse ? availableLanguages(keyVerse, LANGUAGES).filter((c) => c !== 'he') : [];
  const keyLang = keyOptions.includes(primary) ? primary : 'en';

  return (
    <>
      <Seo title={`${tp(`${passage.id}.title`)} — 70 LANGUAGES`} description={tp(`${passage.id}.summary`)} />

      <header className="pb-16 pt-20 lg:pt-32">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-8">
            <Link to={localePath(locale, 'texts')} className="label text-navy/45 hover:text-gold">
              ← {tc('actions.back')}
            </Link>
            <Eyebrow>
              {passage.number} / {String(PASSAGES.length).padStart(2, '0')}
            </Eyebrow>
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95]">{tp(`${passage.id}.title`)}</h1>
            <p lang="he" dir="rtl" className="w-fit font-source text-2xl text-gold">
              {passage.hebrewRef}
            </p>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-navy/65">{tp(`${passage.id}.summary`)}</p>
          </Reveal>
        </Container>
      </header>

      {keyVerse && (
        <section className="bg-paper py-20">
          <Container className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col gap-4">
              <p className="label text-navy/40">{t('passage.keyVerse')} · {keyVerse.hebrewRef}</p>
              <p lang="he" dir="rtl" className="font-source text-4xl leading-snug">{keyVerse.hebrew}</p>
            </div>
            <div className="flex flex-col gap-6">
              <LanguageSelect label={tc('reading.label')} value={keyLang} options={keyOptions} onChange={setPrimary} className="max-w-xs" />
              <TranslationText verse={keyVerse} code={keyLang} className="text-3xl leading-snug" />
            </div>
          </Container>
        </section>
      )}

      <section className="py-20 lg:py-28">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-navy/10 pb-6">
            <h2 className="label text-navy">{t('passage.original')} · {passage.ref}</h2>
            <a href={sefariaUrl(passage.ref)} target="_blank" rel="noopener noreferrer" className="text-sm text-navy/50 hover:text-gold">
              {t('passage.openOnSefaria')} ↗
            </a>
          </div>

          <Suspense fallback={<p className="text-navy/50">{t('passage.loading')}</p>}>
            <Await resolve={hebrew} errorElement={<p className="text-navy/60">{t('passage.error')}</p>}>
              {(verses: SefariaVerse[]) => <HebrewText verses={verses} />}
            </Await>
          </Suspense>

          <p className="border-t border-navy/10 pt-8 text-sm text-navy/50">{t('passage.translationsSoon')}</p>
        </Container>
      </section>

      <nav className="border-t border-navy/10">
        <Container className="grid grid-cols-2 gap-6 py-12">
          <div>{prev && <ButtonLink variant="text" arrow={false} to={localePath(locale, `texts/${prev.id}`)}>← {tp(`${prev.id}.title`)}</ButtonLink>}</div>
          <div className="justify-self-end">{next && <ButtonLink variant="text" to={localePath(locale, `texts/${next.id}`)}>{tp(`${next.id}.title`)}</ButtonLink>}</div>
        </Container>
      </nav>
    </>
  );
}

function HebrewText({ verses }: { verses: SefariaVerse[] }) {
  return (
    <div lang="he" dir="rtl" className="mx-auto flex max-w-3xl flex-col font-source text-2xl leading-[2] sm:text-3xl">
      {verses.map((v) => (
        <p key={`${v.chapter}:${v.verse}`} className="border-b border-navy/5 py-3">
          <span className="me-3 align-super font-sans text-xs text-gold">
            {v.verse === 1 ? `${toHebrewNumeral(v.chapter)}:` : ''}
            {toHebrewNumeral(v.verse)}
          </span>
          {v.text}
        </p>
      ))}
    </div>
  );
}
