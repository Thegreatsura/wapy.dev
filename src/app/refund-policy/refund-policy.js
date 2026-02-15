'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';

export const RefundPolicy = () => {
  const t = useTranslations('pages.refundPolicy');
  const tCommon = useTranslations('common');

  return (
    <div className='flex flex-col items-start justify-start min-h-full mx-auto max-w-4xl'>
      <h1 className='text-3xl font-bold mb-6 text-center'>{tCommon('refundPolicy')}</h1>
      <Card className='text-left'>
        <CardContent className='p-6 space-y-6'>
          <section className='space-y-4'>
            <p>
              <strong>{t('lastUpdated')}</strong>
            </p>
          </section>

          <section className='space-y-4'>
            <p>
              {t.rich('introduction', {
                link: (chunks) => (
                  <Link
                    href='/contact'
                    className='font-medium underline underline-offset-4 focus:outline-hidden'
                    title='Contact form'
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold'>{t('fullRefunds.title')}</h2>
            <ul className='list-disc pl-8'>
              <li>{t('fullRefunds.items.charged')}</li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-xl font-semibold'>{t('partialRefunds.title')}</h2>
            <ul className='list-disc pl-8'>
              <li>{t('partialRefunds.items.week')}</li>
              <li>{t('partialRefunds.items.year')}</li>
              <li>{t('partialRefunds.items.weekDuplicate')}</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};
