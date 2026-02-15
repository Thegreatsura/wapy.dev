'use server';

import { cookies, headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { DefaultLanguage, isLanguageSupported } from '@/config/languages';
import { useAuthServer } from '@/lib/auth-server';
import { LANGUAGE_COOKIE_NAME } from '@/components/language/cookie';
import { ValidateLanguageCode } from '@/components/language/validate';

function deepFill(target, defaults) {
  // If either is not an object, return target
  if (!target || typeof target !== "object" || Array.isArray(target)) {
    return target;
  }

  for (const key of Object.keys(defaults)) {
    const defaultValue = defaults[key];
    const targetValue = target[key];

    if (targetValue === undefined) {
      // Fill missing key
      target[key] = defaultValue;
    } else if (
      targetValue &&
      typeof targetValue === "object" &&
      !Array.isArray(targetValue) &&
      defaultValue &&
      typeof defaultValue === "object" &&
      !Array.isArray(defaultValue)
    ) {
      // Recursively fill nested objects
      deepFill(targetValue, defaultValue);
    }
    // Arrays and other types are left as-is
  }

  return target;
}

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  let locale = DefaultLanguage;

  // Check if a specific locale was requested
  if (requested && isLanguageSupported(requested)) {
    locale = requested;
  }
  // Check User Authentication (Database)
  else {
    const { session, isAuthenticated } = await useAuthServer();
    if (isAuthenticated && isLanguageSupported(session?.user?.language)) {
      locale = session.user.language;
    } else {
      // Check Cookies if locale is still not set
      const cookieStore = await cookies();
      const localeCookie = cookieStore.get(LANGUAGE_COOKIE_NAME);

      if (ValidateLanguageCode(localeCookie?.value)) {
        locale = localeCookie.value;
      } else {
        // Fallback to Accept-Language header
        const headersList = await headers();
        const acceptLanguage = headersList.get('accept-language');
        if (acceptLanguage) {
          const browserLocale = acceptLanguage.split(',')[0].split('-')[0];
          if (isLanguageSupported(browserLocale)) {
            locale = browserLocale;
          }
        }
      }
    }
  }

  return {
    locale,
    messages: deepFill(
      (await import(`../../i18n/${locale}.json`)).default,
      (await import(`../../i18n/${DefaultLanguage}.json`)).default
    ),

    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        },
        long: {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        }
      },
    },
  };
});