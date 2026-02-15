'use client';

import { useTranslations } from 'next-intl';
import { Textarea } from '@/components/ui/textarea';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

export const FormFieldNotes = ({ field }) => {
  const t = useTranslations('components.subscriptions.form.fields.notes');

  return (
    <FormItem className='flex flex-col'>
      <FormLabel>{t('label')}</FormLabel>
      <FormControl>
        <Textarea
          placeholder={t('placeholder')}
          className='min-h-20'
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}