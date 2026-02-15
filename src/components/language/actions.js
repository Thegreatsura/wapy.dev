'use server';

import { useAuthServer } from '@/lib/auth-server';
import { prisma } from '@/lib/prisma';
import { ValidateLanguageCode } from '@/components/language/validate';

export async function UserLanguageSet(language) {
  const validatedLanguage = ValidateLanguageCode(language);
  if (!validatedLanguage) {
    return { success: false, error: 'invalid' };
  }

  const {isAuthenticated, getUserId} = await useAuthServer();
  if (!isAuthenticated()) {
    return { success: false, error: 'invalid' };
  }

  await prisma.user.update({
    where: {
      id: getUserId(),
    },
    data: {
      language: validatedLanguage
    }
  });

  return { success: true };
}
