import { getTranslations } from 'next-intl/server';
import { PrivacyPolicy } from '@/app/privacy/policy';

export default function PagePrivacyPolicy() {
  return (
    <PrivacyPolicy />
  );
}

export async function generateMetadata() {
  const t = await getTranslations('common');
  return {
    title: t('privacyPolicy'),
  };
}