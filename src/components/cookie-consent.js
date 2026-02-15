'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  isCookiePreferencesSet,
  getCookiePreferences,
  saveCookiePreferences,
} from '@/lib/cookies';

export function CookieConsent() {
  const t = useTranslations('components.cookieConsent');
  const [showConsent, setShowConsent] = useState(false);
  const [preferences, setPreferences] = useState(getCookiePreferences());

  useEffect(() => {
    setShowConsent(!isCookiePreferencesSet());
  }, []);

  const savePreferences = (prefs) => {
    saveCookiePreferences(prefs);
    setShowConsent(!isCookiePreferencesSet());
  };

  const acceptAll = () => {
    savePreferences({
      essential: true,
      functional: true,
      analytics: true,
    });
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  if (!showConsent) return null;

  return (
    <Card className='fixed bottom-4 left-4 right-4 mx-auto max-w-xl z-50'>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <Checkbox
            checked={preferences.essential}
            disabled={true}
            title={t('essential.title')}
          />
          <div className='grid gap-1.5 leading-none'>
            <label className='font-medium'>
              {t('essential.title')}
            </label>
            <p className='text-sm text-muted-foreground'>
              {t('essential.description')}
            </p>
          </div>
        </div>

        <Separator />

        <div className='flex items-center space-x-2'>
          <Checkbox
            checked={preferences.functional}
            onCheckedChange={(checked) =>
              setPreferences(prev => ({ ...prev, functional: checked === true }))
            }
            title={t('functional.title')}
          />
          <div className='grid gap-1.5 leading-none'>
            <label className='font-medium'>
              {t('functional.title')}
            </label>
            <p className='text-sm text-muted-foreground'>
              {t('functional.description')}
            </p>
          </div>
        </div>

        <Separator />

        <div className='flex items-center space-x-2'>
          <Checkbox
            checked={preferences.analytics}
            onCheckedChange={(checked) =>
              setPreferences(prev => ({ ...prev, analytics: checked === true }))
            }
            title={t('analytics.title')}
          />
          <div className='grid gap-1.5 leading-none'>
            <label className='font-medium'>
              {t('analytics.title')}
            </label>
            <p className='text-sm text-muted-foreground'>
              {t('analytics.description')}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <Button variant='outline' onClick={saveCustomPreferences}>
          {t('buttons.savePreferences')}
        </Button>
        <Button onClick={acceptAll}>
          {t('buttons.acceptAll')}
        </Button>
      </CardFooter>
    </Card>
  );
}