'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

export const FormFieldUrl = ({ field }) => {
  const t = useTranslations('components.subscriptions.form.fields.url');

  return (
    <FormItem className='flex flex-col'>
      <FormLabel>{t('label')}</FormLabel>
      <FormControl>
        <Input
          type='url'
          placeholder='https://...'
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}