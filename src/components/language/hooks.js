'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale as useNextIntlLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-client';
import { UserLanguageSet } from '@/components/language/actions';
import { SetLanguageCookie } from '@/components/language/cookie';
import { ValidateLanguageCode } from '@/components/language/validate';
import { canUseCookie } from '@/lib/cookies';

export const useLanguage = () => {
  const language = useNextIntlLocale();
  const router = useRouter();
  const {isAuthenticated} = useAuth();
  const [canUpdate, setCanUpdate] = useState(isAuthenticated || canUseCookie('functional'));

  useEffect(() => {
    setCanUpdate(isAuthenticated || canUseCookie('functional'));
  }, [isAuthenticated]);

  const refreshUpdateability = useCallback(() => {
    setCanUpdate(isAuthenticated || canUseCookie('functional'));
  }, [isAuthenticated]);

  const setLanguage = async (update) => {
    try {
      const validatedLanguage = ValidateLanguageCode(update);
      if (!validatedLanguage) {
        throw new Error('invalid');
      }

      if (isAuthenticated) {
        const result = await UserLanguageSet(validatedLanguage);
        if (!result.success) {
          throw new Error(result.error || 'invalid');
        }
      }

      SetLanguageCookie(validatedLanguage);
      router.refresh();
    } catch (error) {
      throw new Error(error?.message || 'failed');
    }
  };

  return {
    language,
    setLanguage,
    canUpdateLanguage: canUpdate,
    refreshLanguage: refreshUpdateability,
  };
}
