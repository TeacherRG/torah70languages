import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

export function PageHeader({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: string; children?: ReactNode }) {
  return (
    <header className="pb-16 pt-20 lg:pb-24 lg:pt-32">
      <Container className="flex flex-col gap-8">
        <Reveal className="flex flex-col gap-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-5xl font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] text-balance">{title}</h1>
          {lead && <p className="max-w-2xl text-lg font-light leading-relaxed text-navy/65 text-pretty">{lead}</p>}
          {children}
        </Reveal>
      </Container>
    </header>
  );
}
