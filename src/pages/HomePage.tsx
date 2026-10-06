import { useTranslation } from 'react-i18next';
import { Seo } from '@/components/layout/Seo';
import { Hero } from '@/features/home/sections/Hero';
import { InTheBeginning } from '@/features/home/sections/InTheBeginning';
import { FromOneToSeventy } from '@/features/home/sections/FromOneToSeventy';
import { CoreCollection } from '@/features/home/sections/CoreCollection';
import { LanguageConstellation } from '@/features/home/sections/LanguageConstellation';
import { OneTextSeventyWorlds } from '@/features/home/sections/OneTextSeventyWorlds';
import { CompareSection } from '@/features/home/sections/CompareSection';
import { NumbersBand } from '@/features/home/sections/NumbersBand';

export default function HomePage() {
  const { t } = useTranslation('home');
  return (
    <>
      <Seo title={t('meta.title')} description={t('meta.description')} />
      <Hero />
      <InTheBeginning />
      <FromOneToSeventy />
      <CoreCollection />
      <LanguageConstellation />
      <OneTextSeventyWorlds />
      <CompareSection />
      <NumbersBand />
    </>
  );
}
