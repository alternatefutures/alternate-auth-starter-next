import { createAuth } from '@alternatefutures/ac-auth-next';
import { authConfig } from './auth-config';

/**
 * `auth()` reads the session in Server Components, Server Actions and Route
 * Handlers. `handlers` are mounted at app/api/auth/[...auth]/route.ts.
 */
export const { auth, handlers, signInPath, signOutPath, toClientSession } = createAuth(authConfig);
