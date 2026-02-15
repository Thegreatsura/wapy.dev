'use client';

import { useTranslations } from 'next-intl';
import { addYears } from 'date-fns';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

export const FormFieldPaymentDate = ({ field }) => {
  const t = useTranslations('components.subscriptions.form.fields.paymentDate');

  return (
    <FormItem className='flex flex-col'>
      <FormLabel>{t('label')}</FormLabel>
      <FormControl>
        <DateTimePicker
          min={new Date()}
          max={addYears(new Date(), 15)}
          timePicker={{ hour: true, minute: true, second: false, increment: 30 }}
          value={field.value}
          onChange={field.onChange}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}