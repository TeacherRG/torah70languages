import { useTranslation } from 'react-i18next';
import { PASSAGES } from '@/content/passages';
import { LANGUAGES } from '@/content/languages';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

export function NumbersBand() {
  const { t } = useTranslation('home');
  const items = [
    { value: String(LANGUAGES.length), label: t('numbers.languages') },
    { value: String(PASSAGES.length), label: t('numbers.passages') },
    { value: t('numbers.one'), label: t('numbers.source') },
  ];
  return (
    <section className="border-y border-navy/10 bg-sand/60 py-16">
      <Container>
        <dl className="grid gap-10 text-center sm:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1} className="flex flex-col gap-2">
              <dt className="order-2 label text-navy/50">{item.label}</dt>
              <dd className="order-1 font-display text-6xl font-light text-navy">{item.value}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
