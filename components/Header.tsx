'use client';

import Link from 'next/link';
import { SignedIn, UserButton } from '@alternatefutures/ac-auth-next/react';
import { Button } from '@/components/ui/button';

/**
 * The web app's top navigation shape (components/navigation/Navigation.tsx):
 * a 14-unit bar, brand left, account right. Signed-out visitors get no bar:
 * the sign-in card is the whole page, like the platform's own sign-in page.
 */
export function Header() {
  return (
    <SignedIn>
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <Link href="/" className="px-2 py-1 text-xl font-bold text-foreground">
              Starter
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton returnTo="/" />
          </div>
        </div>
      </header>
    </SignedIn>
  );
}
