'use client';

import { useTranslations } from 'next-intl';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

export const FormFieldUntilDate = ({ field }) => {
  const t = useTranslations('components.subscriptions.form.fields.untilDate');

  return (
    <FormItem className='flex flex-col'>
      <FormLabel>{t('label')}</FormLabel>
      <FormControl>
        <DateTimePicker
          min={new Date()}
          hideTime={true}
          clearable
          value={field.value}
          onChange={field.onChange}
        />
      </FormControl>
      <FormDescription>
        {t('description')}
      </FormDescription>
      <FormMessage />
    </FormItem>
  )
}