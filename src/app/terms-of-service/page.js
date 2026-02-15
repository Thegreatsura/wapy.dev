import { getTranslations } from 'next-intl/server';
import { TermsOfService } from '@/app/terms-of-service/terms-of-service';

export default function PageTermsOfService() {
  return (
    <TermsOfService />
  );
}

export async function generateMetadata() {
  const t = await getTranslations('common');
  return {
    title: t('termsOfService'),
  };
}