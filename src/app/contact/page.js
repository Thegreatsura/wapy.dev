import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/app/contact/form';

export default function PageContact() {
  return (
    <div className='flex flex-col grow justify-center items-center'>
      <ContactForm />
    </div>
  );
}

export async function generateMetadata() {
  const t = await getTranslations('common');

  return {
    title: t('contact'),
  };
}