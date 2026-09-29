import { createAuthProxy } from '@alternatefutures/ac-auth-next/proxy';
import { authConfig } from '@/lib/auth-config';

/**
 * The only place the session cookie is refreshed (tokens rotate here).
 * Pages under `protect` redirect to the sign-in when there is no session;
 * every other page decides for itself with `auth()`.
 */
export const proxy = createAuthProxy(authConfig, { protect: ['/dashboard'] });

// Next.js needs this literal here (an imported constant is not accepted):
// everything except static assets. The auth routes skip themselves.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|json|woff2?)$).*)'],
};
