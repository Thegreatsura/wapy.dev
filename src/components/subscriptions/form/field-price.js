'use client';

import { useTranslations } from 'next-intl';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const FormFieldPrice = ({ field }) => {
  const t = useTranslations('components.subscriptions.form.fields.price');

  return (
    <FormItem className='w-full sm:w-50'>
      <FormLabel>{t('label')}</FormLabel>
      <FormControl>
        <Input
          type='number'
          step='0.01'
          min='0'
          placeholder='9.99'
          className='text-sm'
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};