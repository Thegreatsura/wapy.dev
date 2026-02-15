import Cookies from 'js-cookie';
import { RemoveLanguageCookie } from '@/components/language/cookie';

const PREFERENCES_COOKIE_KEY = 'wapy-dev.cookie-preferences-v1';

const defaultPreferences= {
  essential: true,
  functional: true,
  analytics: false,
};

export const isCookiePreferencesSet = () => {
  return !!Cookies.get(PREFERENCES_COOKIE_KEY);
}

export const getCookiePreferences = () => {
  const preferences = Cookies.get(PREFERENCES_COOKIE_KEY);
  if (!preferences) {
    return defaultPreferences;
  }
  return JSON.parse(preferences);
};

export const saveCookiePreferences = (prefs) => {
  Cookies.set(PREFERENCES_COOKIE_KEY, JSON.stringify(prefs), {
    expires: 365,
    sameSite: 'lax'
  });

  // Clear non-essential cookies if they're declined
  if (!prefs.functional) {
    Cookies.remove('theme');
    RemoveLanguageCookie();
  }
};

export const updateCookiePreferences = () => {
  saveCookiePreferences({
    ...getCookiePreferences(),
    functional: true,
  });
};

// Type: 'essential' | 'functional' | 'analytics'
export const canUseCookie = (type) => {
  const preferences = getCookiePreferences();
  return preferences[type];
};
