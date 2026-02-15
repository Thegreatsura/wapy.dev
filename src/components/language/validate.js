import { LanguageCodeSchema } from '@/components/language/schema';

export const ValidateLanguageCode = (language) => {
  const result = LanguageCodeSchema.safeParse({ language: language });
  if (!result?.success || !result?.data || result?.data?.language !== language) {
    return null;
  }

  return result.data.language;
};