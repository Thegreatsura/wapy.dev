import { getTranslations } from 'next-intl/server';
import { RefundPolicy } from '@/app/refund-policy/refund-policy';

export default function PageRefundPolicy() {
  return (
    <RefundPolicy />
  );
}

export async function generateMetadata() {
  const t = await getTranslations('common');
  return {
    title: t('refundPolicy'),
  };
}