import { handlers } from '@/lib/auth';

// GET  /api/auth/signin    starts the sign-in (PKCE)
// GET  /api/auth/callback  finishes it and sets the session cookie
// POST /api/auth/signout   ends the session
// GET  /api/auth/session   the client-safe session (no tokens)
export const { GET, POST } = handlers;
