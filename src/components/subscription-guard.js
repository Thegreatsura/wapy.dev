'use server';

import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { PADDLE_STATUS_MAP, paddleIsValid } from '@/lib/paddle/enum';

export const SubscriptionGuard = async ({ children, paddleStatus }) => {
  if (!paddleStatus?.enabled || paddleIsValid(paddleStatus?.status)) {
    return <>{children}</>;
  }

  const t = await getTranslations('components.subscriptionGuard');

  const getDescription = () => {
    if (paddleStatus?.status === PADDLE_STATUS_MAP.trialExpired) {
      return t('description.trialExpired');
    } else if (paddleStatus?.status === PADDLE_STATUS_MAP.cancelled) {
      return t('description.cancelled');
    } else if (paddleStatus?.status === PADDLE_STATUS_MAP.past_due) {
      return t('description.pastDue');
    } else if (paddleStatus?.status === PADDLE_STATUS_MAP.paused) {
      return t('description.paused');
    } else {
      return t('description.default');
    }
  };

  return (
    <>
      <div className='absolute z-10 -m-[0.25rem] inset-0 flex flex-col items-center grow backdrop-blur-xs bg-background/70'>
        <Card className='w-full max-w-md sticky top-20 mt-4'>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>
              {getDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>
              {t('message')}
            </p>
          </CardContent>
          <CardFooter className='flex justify-center'>
            <Button asChild>
              <Link href='/account'>
                <Icons.settings />
                {t('button')}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      {children}
    </>
  );
};
