import Cookies from 'js-cookie';
import { canUseCookie } from '@/lib/cookies';

export const LANGUAGE_COOKIE_NAME = 'wapy-dev.language';

export const SetLanguageCookie = (language) => {
  if (canUseCookie('functional')) {
    Cookies.set(LANGUAGE_COOKIE_NAME, language, {
      expires: 365,
      sameSite: 'lax'
    });
  }
}

export const RemoveLanguageCookie = () => {
  Cookies.remove(LANGUAGE_COOKIE_NAME);
}