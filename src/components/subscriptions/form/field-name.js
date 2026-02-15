'use client';

import { useTranslations } from 'next-intl';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const FormFieldName = ({ field }) => {
  const t = useTranslations('components.subscriptions.form.fields.name');

  return (
    <FormItem>
      <FormLabel>{t('label')}</FormLabel>
      <FormControl>
        <Input placeholder={t('placeholder')} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};