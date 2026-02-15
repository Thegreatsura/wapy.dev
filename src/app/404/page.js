import { getTranslations } from 'next-intl/server';
import { NotFound } from '@/components/not-found';

export default function Page404() {
  return (
    <NotFound />
  );
}

export async function generateMetadata() {
  const t = await getTranslations('pages.notFound.meta');
  return {
    title: t('title'),
    description: t('description'),
  };
}
