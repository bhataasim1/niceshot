'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ModeToggle } from '../common/mode-toggle';
import { GithubSolid } from '../icons/github-solid';
import { HeaderBase } from './header-base';
import Image from 'next/image';
import { useCurrentUserWithSubscription } from '@/hooks/tanstack-query/user.hooks';

export function Header() {
  const { data: user } = useCurrentUserWithSubscription();

  const leftContent = (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo-white.png"
        alt="Niceshot Logo"
        width={40}
        height={40}
        className="hidden dark:block"
      />
      <Image
        src="/logo-black.png"
        alt="Niceshot Logo"
        width={40}
        height={40}
        className="block dark:hidden"
      />
      <span className="text-xl font-medium">Niceshot</span>
    </Link>
  );

  const rightContent = (
    <nav className="flex items-center gap-1">
      <div className="flex items-center gap-2">
        <Link href="https://github.com/bhataasim1/niceshot">
          <Button size="icon" variant="ghost">
            <GithubSolid className="size-6" />
          </Button>
        </Link>
        <ModeToggle />
      </div>
      {user ? (
        <Link href="/editor">
          <Button className="ml-4">Editor</Button>
        </Link>
      ) : (
        <Link href="/sign-in">
          <Button className="ml-4">Sign In</Button>
        </Link>
      )}
    </nav>
  );

  return (
    <div className="mx-4 md:mx-0">
      <HeaderBase
        className=" border rounded-2xl max-w-3xl mx-auto mt-4 pl-4 pr-[14px]"
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </div>
  );
}
