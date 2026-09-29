import type { AcAuthConfig } from '@alternatefutures/ac-auth-next';

/**
 * One config object, shared by the server (`lib/auth.ts`) and the proxy
 * (`proxy.ts`), which runs in its own runtime. Everything else comes from
 * the environment: ALTERNATE_CLOUDS_CLIENT_ID, ALTERNATE_CLOUDS_CLIENT_SECRET
 * (confidential clients only), AUTH_SECRET, ALTERNATE_CLOUDS_ISSUER.
 */
export const authConfig: AcAuthConfig = {
  // `wallet` adds the user's verified wallet; `org` would add an organization picker at consent.
  scope: ['openid', 'profile', 'email', 'wallet'],
  postLogoutRedirectUri: process.env.ALTERNATE_CLOUDS_POST_LOGOUT_REDIRECT_URI,
};
