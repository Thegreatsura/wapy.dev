'use server';

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { useAuthServer } from '@/lib/auth-server';
import { withAuth } from '@/lib/with-auth';
import { SubscriptionGet, SubscriptionGetPastPaymentsStats } from '@/components/subscriptions/actions';
import { SubscriptionView } from '@/components/subscriptions/view';
import { paddleGetSession } from '@/lib/paddle/status';
import { SubscriptionGuard } from '@/components/subscription-guard';

const PageSubscriptionView = async ({ params }) => {
  const slug = (await params).slug;
  const {session, paddleStatus} = await paddleGetSession();

  const subscription = await SubscriptionGet(slug, session?.user?.id);
  if (!subscription) {
    return notFound();
  }
  subscription.pastPayments = await SubscriptionGetPastPaymentsStats(subscription.id, session?.user?.id);

  return (
    <SubscriptionGuard paddleStatus={paddleStatus}>
      <div className='container flex flex-col items-center justify-center gap-6'>
        <SubscriptionView subscription={subscription} externalServices={session?.user?.externalServices || {}} />
      </div>
    </SubscriptionGuard>
  );
};

export default withAuth(PageSubscriptionView);

export async function generateMetadata({ params }) {
  const t = await getTranslations('pages.view.meta');
  const tNotFound = await getTranslations('pages.notFound.meta');
  const {isAuthenticated, getUserId} = await useAuthServer();

  if (!isAuthenticated()) {
    return {
      title: t('unauthorized'),
    };
  }

  const subscriptionId = (await params).slug;
  const subscription = await SubscriptionGet(subscriptionId, getUserId());

  return {
    title: subscription?.name ? t('view', { name: subscription.name }) : tNotFound('title'),
  };
}