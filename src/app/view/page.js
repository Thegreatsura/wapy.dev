import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default function PageView() {
  return notFound();
}

export async function generateMetadata() {
  const t = await getTranslations('pages.notFound.meta');
  return {
    title: t('title'),
  };
}