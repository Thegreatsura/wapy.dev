import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export default function PageEdit() {
  return notFound();
}

export async function generateMetadata() {
  const t = await getTranslations('pages.notFound.meta');

  return {
    title: t('title'),
  };
}