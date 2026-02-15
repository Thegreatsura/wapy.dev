'use client'

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Icons } from '@/components/icons';
import { PricingTable } from '@/components/pricing-table';
import { siteConfig } from '@/components/config';

export const HomeVisitor = () => {
  const t = useTranslations('home.visitor');
  return (
    <div className='flex flex-col grow mx-auto gap-24 w-full justify-center items-center'>
      {/* Hero Section */}
      <div className='flex flex-col items-center text-center gap-6'>
        <div className='inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4'>
          ✨ {t('hero.badge')}
        </div>
        <h1 className='text-3xl md:text-6xl font-bold tracking-tight'>
          {t('hero.title')}
        </h1>
        <h2 className='text-xl text-muted-foreground-light max-w-4xl'>
          {t('hero.subtitle', { appName: siteConfig.name })}
        </h2>
        <h3 className='text-xl text-muted-foreground-light font-semibold max-w-4xl'>
          {t('hero.tagline')}
        </h3>
        <div className='w-full max-w-4xl'>
          <PricingTable />
        </div>
        <Image src='/images/banner.png' alt={t('hero.imageAlt')} width={960} height={600} />
      </div>

      <div className='flex flex-col gap-6'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold mb-4'>{t('features.title')}</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            {t('features.subtitle')}
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='p-6 rounded-lg border bg-card shadow-lg'>
            <div className='flex flex-col items-center gap-4 mb-4'>
              <Icons.repeat className='size-5 text-primary' />
              <h3 className='font-semibold text-xl'>{t('features.billingCycles.title')}</h3>
            </div>
            <p className='text-muted-foreground'>
              {t('features.billingCycles.description')}
            </p>
          </div>

          <div className='p-6 rounded-lg border bg-card shadow-lg'>
            <div className='flex flex-col items-center gap-4 mb-4'>
              <Icons.bell className='size-5 text-primary' />
              <h3 className='font-semibold text-xl'>{t('features.notifications.title')}</h3>
            </div>
            <p className='text-muted-foreground'>
              {t('features.notifications.description')}
            </p>
          </div>

          <div className='p-6 rounded-lg border bg-card shadow-lg'>
            <div className='flex flex-col items-center gap-4 mb-4'>
              <Icons.pieChart className='size-5 text-primary' />
              <h3 className='font-semibold text-xl'>{t('features.reports.title')}</h3>
            </div>
            <p className='text-muted-foreground'>
              {t('features.reports.description')}
            </p>
          </div>

          <div className='p-6 rounded-lg border bg-card shadow-lg'>
            <div className='flex flex-col items-center gap-4 mb-4'>
              <Icons.currency className='size-5 text-primary' />
              <h3 className='font-semibold text-xl'>{t('features.currencies.title')}</h3>
            </div>
            <p className='text-muted-foreground'>
              {t('features.currencies.description')}
            </p>
          </div>

          <div className='p-6 rounded-lg border bg-card shadow-lg'>
            <div className='flex flex-col items-center gap-4 mb-4'>
              <Icons.globe className='size-5 text-primary' />
              <h3 className='font-semibold text-xl'>{t('features.timezone.title')}</h3>
            </div>
            <p className='text-muted-foreground'>
              {t('features.timezone.description')}
            </p>
          </div>

          <div className='p-6 rounded-lg border bg-card shadow-lg'>
            <div className='flex flex-col items-center gap-4 mb-4'>
              <Icons.tag className='size-5 text-primary' />
              <h3 className='font-semibold text-xl'>{t('features.categories.title')}</h3>
            </div>
            <p className='text-muted-foreground'>
              {t('features.categories.description')}
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold mb-4'>{t('howItWorks.title')}</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            {t('howItWorks.subtitle')}
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='text-center space-y-4'>
            <div className='w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold'>
              1
            </div>
            <h3 className='font-semibold text-xl'>{t('howItWorks.step1.title')}</h3>
            <p className='text-muted-foreground'>
              {t('howItWorks.step1.description')}
            </p>
          </div>
          <div className='text-center space-y-4'>
            <div className='w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold'>
              2
            </div>
            <h3 className='font-semibold text-xl'>{t('howItWorks.step2.title')}</h3>
            <p className='text-muted-foreground'>
              {t('howItWorks.step2.description')}
            </p>
          </div>
          <div className='text-center space-y-4'>
            <div className='w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold'>
              3
            </div>
            <h3 className='font-semibold text-xl'>{t('howItWorks.step3.title')}</h3>
            <p className='text-muted-foreground'>
              {t('howItWorks.step3.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
