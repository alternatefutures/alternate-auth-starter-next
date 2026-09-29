import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@alternatefutures/ac-auth-next/react';
import { instrumentSans } from '@/app/fonts';
import { auth, toClientSession } from '@/lib/auth';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Alternate Clouds sign-in starter',
  description: 'Sign in with Alternate Clouds in a Next.js app.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Known on the server, so the first paint already shows the right state.
  const session = await auth();
  return (
    // Same shell as the Alternate Clouds web app: Instrument Sans, dark scheme.
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} font-sans antialiased`}>
        {/* theme="inherit": the components use this app's stylesheet (the web app's palette). */}
        <AuthProvider initialSession={toClientSession(session)} theme="inherit">
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
