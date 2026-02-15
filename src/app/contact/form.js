'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendContactForm } from '@/app/contact/actions';
import { Icons } from '@/components/icons';

export function ContactForm() {
  const t = useTranslations('pages.contact');
  const tCommon = useTranslations('common');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, t('form.name.error')),
    email_address: z.string().email(t('form.email.error')),
    message: z.string().min(10, t('form.message.error')),
    honey_pot_email: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email_address: '',
      message: '',
      honey_pot_email: '',
    },
  });

  const onSubmit = async (values) => {
    if (values.honey_pot_email) {
      toast.error(t('toast.spam'));
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendContactForm(values);

      if (result.error) {
        throw new Error(result.error);
      }

      form.reset();
      setIsSubmitted(true);
      toast.success(t('toast.success'));
    } catch (error) {
      toast.error(t('toast.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col gap-6 max-w-2xl'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>{tCommon('contact')}</h1>
        <p className='text-muted-foreground text-lg'>
          {t('description')}
        </p>
      </div>
      {isSubmitted ? (
        <div className='rounded-lg border bg-card p-6 shadow-xs text-center space-y-4'>
          <Icons.check className='mx-auto h-12 w-12 text-green-500' />
          <h2 className='text-2xl font-semibold'>{t('success.title')}</h2>
          <p className='text-muted-foreground'>
            {t('success.message1')}
            <br />
            {t('success.message2')}
          </p>
        </div>
      ) : (
        <div className='rounded-lg border bg-card p-6 shadow-xs'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid gap-6 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.name.label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('form.name.placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email_address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.email.label')}</FormLabel>
                      <FormControl>
                        <Input type='email' placeholder={t('form.email.placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='message'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.message.label')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('form.message.placeholder')}
                        className='min-h-37.5 resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <input
                type='email'
                name='honey_pot_email'
                tabIndex={-1}
                aria-hidden='true'
                {...form.register('honey_pot_email')}
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              />
              <Button type='submit' title={t('form.submit')} size='lg' className='w-full' disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                    {t('form.submitting')}
                  </>
                ) : (
                  t('form.submit')
                )}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}