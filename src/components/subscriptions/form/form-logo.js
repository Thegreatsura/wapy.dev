'use client';

import { useTranslations } from 'next-intl';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { IconPicker } from '@/components/ui/icon-picker';

export const FormFieldLogo = ({ field }) => {
  const t = useTranslations('components.subscriptions.form.fields.logo');

  return (
    <FormItem>
      <FormLabel>{t('label')}</FormLabel>
      <FormControl>
        <div className='flex flex-col gap-1'>
          <IconPicker
            icon={field.value}
            onChange={field.onChange}
          />
        </div>
      </FormControl>
      <FormDescription>
        {t('description')}
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};
