import { useTranslation } from 'react-i18next';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

const STEPS = ['read', 'compare', 'discover'] as const;
const NUMERALS = ['I', 'II', 'III'];

/** The manifesto moment — the only dark (deep navy) section on the page. */
export function OneTextSeventyWorlds() {
  const { t } = useTranslation('home');
  return (
    <section className="bg-navy py-28 text-ivory lg:py-44">
      <Container className="flex flex-col gap-20">
        <Reveal>
          <h2 className="font-display text-[clamp(3rem,9vw,8rem)] font-light uppercase leading-[0.9] tracking-[0.02em]">
            <span className="block">{t('worlds.line1')}</span>
            <span className="block text-gold">{t('worlds.line2')}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-2xl font-display text-2xl italic leading-snug text-ivory/80 sm:text-3xl">
            {t('worlds.body')}
          </p>
        </Reveal>
        <ol className="grid gap-px border-y border-ivory/15 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step} delay={0.1 * i} className="flex flex-col gap-6 py-10 sm:pe-10">
              <span className="font-display text-gold">{NUMERALS[i]}</span>
              <span className="text-xl font-light">{t(`worlds.steps.${step}`)}</span>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
