'use server';

import { getTranslations } from 'next-intl/server';
import { PricingTable } from '@/components/pricing-table';

const PagePricing = async () => {
  const t = await getTranslations('pages.pricing');

  return (
    <div className='flex flex-col grow items-center justify-center w-full max-w-4xl gap-4'>
      <section className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4 text-center'>
          <h1 className='font-bold text-4xl sm:text-5xl'>
            {t('title')}
          </h1>
          <p className='text-muted-foreground text-xl max-w-2xl mx-auto'>
            {t('description')}
          </p>
        </div>

        <PricingTable />
      </section>
    </div>
  )
}

export default PagePricing;

export async function generateMetadata() {
  const t = await getTranslations('common');
  return {
    title: t('pricing'),
  };
};