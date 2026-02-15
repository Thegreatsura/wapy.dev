'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { useLanguage } from '@/components/language/hooks';
import { getSupportedLanguageCodes, getLanguageConfig } from '@/config/languages';
import { updateCookiePreferences } from '@/lib/cookies';
import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
  ResponsiveDialogBody,
} from '@/components/ui/responsive-dialog';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

export function LanguageSelector({ className }) {
  const t = useTranslations('languages');
  const tCommon = useTranslations('common');
  const {language, setLanguage, canUpdateLanguage, refreshLanguage} = useLanguage();
  const [open, setOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const pathname = usePathname();

  const currentLanguage = getLanguageConfig(language);
  const CurrentFlag = currentLanguage?.flag || Icons.languages;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLanguageSelect = async (code) => {
    if (code === language) {
      setOpen(false);
      return;
    }

    setIsChanging(true);
    try {
      await setLanguage(code);
    } catch (error) {
      toast.error(t(error.message || 'failed'));
    } finally {
      setOpen(false);
      setIsChanging(false);
    }
  };

  const handleEnableCookies = () => {
    updateCookiePreferences();
    refreshLanguage();
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogTrigger asChild>
        <Button
          variant='ghost'
          className={cn('cursor-pointer', className)}
          aria-label={t('selectLanguage')}
          title={t('selectLanguage')}
        >
          <CurrentFlag />
          <span className='lang-text'>
            {currentLanguage?.nativeName || t('language')}
          </span>
        </Button>
      </ResponsiveDialogTrigger>

      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <div className='flex flex-row gap-4 items-center text-left'>
            <Icons.languages className='size-6' />
            <ResponsiveDialogTitle>
              { canUpdateLanguage
                ? t('selectLanguage')
                : t('notAvailableTitle')
              }
            </ResponsiveDialogTitle>
          </div>
          <ResponsiveDialogDescription></ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody className='max-h-[60vh] overflow-y-auto'>
          {!canUpdateLanguage ? (
            <div className='flex flex-col gap-2 my-4'>
              <p className='text-sm text-muted-foreground mb-3'>
                {t('notAvailableMessage')}
              </p>
              <div className='flex flex-col gap-2 items-start'>
                <Button asChild
                  variant='link'
                  className='p-0'
                >
                  <Link href='/login'>
                    <Icons.signIn />
                    {tCommon('signIn')}
                  </Link>
                </Button>
                <Button
                  onClick={handleEnableCookies}
                  className='p-0 cursor-pointer'
                  variant='link'
                >
                  <Icons.cookie />
                  {t('enableCookies')}
                </Button>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-2 my-4'>
              {getSupportedLanguageCodes().map((lang) => {
                const config = getLanguageConfig(lang);
                const Flag = config.flag;
                const isSelected = lang === language;

                return (
                  <Button
                    key={lang}
                    variant='ghost'
                    size='lg'
                    onClick={() => handleLanguageSelect(lang)}
                    disabled={isChanging}
                    className={cn(
                      'h-auto px-4 py-1 gap-4 cursor-pointer',
                      isSelected && 'bg-accent'
                    )}
                    aria-label={`${config.nativeName}`}
                    aria-current={isSelected ? 'true' : 'false'}
                  >
                    <span role='img' aria-label={`${config.nativeName}`} className='[&_svg]:size-10'>
                      <Flag />
                    </span>
                    <div className='flex-1 text-left'>
                      <div className='font-medium'>{config.nativeName}</div>
                    </div>
                    {isSelected && (
                      <Icons.check className='h-5 w-5 text-primary' aria-hidden='true' />
                    )}
                  </Button>
                );
              })}
            </div>
          )}
        </ResponsiveDialogBody>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
