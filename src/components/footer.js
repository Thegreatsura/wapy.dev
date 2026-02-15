'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LanguageSelector } from '@/components/language/selector';

export default function Footer( { author, github } ) {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');

  return (
    <footer className='border-t'>
      <div className='container mx-auto p-4'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex items-center shrink-0'>
            <p className='text-sm'>
              {t.rich('madeBy', {
                name: author.name,
                author: (chunks) => (
                  <Link
                    href={author.url}
                    className='font-medium underline underline-offset-4 focus:outline-hidden'
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    {chunks}
                  </Link>
                )
              })}
            </p>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <Link href='/contact' className='inline-flex items-center gap-1 text-sm text-center font-medium focus:outline-hidden'>
              <Icons.send className='size-4' />
              { tCommon('contact') }
            </Link>
            <Separator orientation='vertical' className='h-4' />
            <Link href={ github } target='_blank' className='inline-flex items-center gap-1 text-sm text-center font-medium focus:outline-hidden' rel='noreferrer noopener'>
              <Icons.github className='size-4' />
              { t('github') }
            </Link>

            <Separator orientation='vertical' className='h-4' />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='inline-flex items-center gap-1 text-sm text-center font-medium focus:outline-hidden cursor-pointer'>
                  <Icons.menu className='size-4' />
                  { t('menu') }
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-52 space-y-2 px-1 py-2'>
                <DropdownMenuItem asChild>
                  <LanguageSelector className='cursor-pointer h-auto w-full justify-normal text-start text-wrap' />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href='/pricing' className='inline-flex items-center gap-1 w-full cursor-pointer text-sm font-medium focus:outline-hidden'>
                    <Icons.wallet className='size-4' />
                    { tCommon('pricing') }
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/refund-policy' className='inline-flex items-center gap-1 w-full cursor-pointer text-sm font-medium focus:outline-hidden'>
                    <Icons.receipt className='size-4' />
                    { tCommon('refundPolicy') }
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/privacy' className='inline-flex items-center gap-1 w-full cursor-pointer text-sm font-medium focus:outline-hidden'>
                    <Icons.shieldCheck className='size-4' />
                    { tCommon('privacyPolicy') }
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/terms-of-service' className='inline-flex items-center gap-1 w-full cursor-pointer text-sm font-medium focus:outline-hidden'>
                    <Icons.scroll className='size-4' />
                    { tCommon('termsOfService') }
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </footer>
  );
}