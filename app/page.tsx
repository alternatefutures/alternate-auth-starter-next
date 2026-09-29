import Link from 'next/link';
import { SignIn, SignedIn, SignedOut } from '@alternatefutures/ac-auth-next/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <>
      <SignedOut>
        {/* The web app's auth shell (components/auth/AuthPage.tsx AuthShell): the card centered in the viewport. */}
        <div className="flex min-h-screen items-center justify-center p-4 py-10 lg:p-12">
          <SignIn appName="Starter" returnTo="/dashboard" termsUrl="/terms" privacyUrl="/privacy" />
        </div>
      </SignedOut>
      <SignedIn>
        <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>You are signed in</CardTitle>
            <CardDescription>
              The session lives in an encrypted cookie on this server. The dashboard shows what the ID token says.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard">Open the dashboard</Link>
            </Button>
          </CardContent>
        </Card>
        </main>
      </SignedIn>
    </>
  );
}
