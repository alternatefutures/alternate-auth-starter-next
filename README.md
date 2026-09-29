# Alternate Clouds sign-in starter (Next.js)

A Next.js App Router app where users sign in with their Alternate Clouds
account: a public page with the sign-in card, a protected dashboard, and the
account menu. Tokens never reach the browser; the session is an encrypted
cookie refreshed by the proxy.

## Five minutes to a signed-in page

1. Create a client. In the Alternate Clouds web app open **Organization ›
   Developer**, click **New client**, type **public**, redirect URI
   `http://localhost:3000/api/auth/callback`, post-logout redirect URI
   `http://localhost:3000/` (optional). Copy the client id.

2. Create the app:

   ```bash
   npx create-next-app@latest my-app -e https://github.com/alternatefutures/alternate-auth-starter-next
   cd my-app
   ```

3. Configure it:

   ```bash
   cp .env.example .env.local
   ```

   Set `ALTERNATE_CLOUDS_CLIENT_ID` to your client id and `AUTH_SECRET` to
   the output of `openssl rand -base64 32`.

4. Run it and sign in:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000, click **Continue with Alternate Clouds**, sign
   in on the Alternate Clouds page, approve, and you land on the dashboard.

## What is where

| File | Role |
|---|---|
| `lib/auth-config.ts` | The one config object (scopes, post-logout URI); ids and secrets come from the environment. |
| `lib/auth.ts` | `createAuth()`: `auth()` for server code, the route `handlers`. |
| `app/api/auth/[...auth]/route.ts` | Mounts the handlers: `signin`, `callback`, `signout`, `session`. |
| `proxy.ts` | Refreshes the session cookie (the only place tokens rotate) and protects `/dashboard`. |
| `app/layout.tsx` | Reads the session on the server and hands it to `<AuthProvider>` so the first paint is right. |
| `components/Header.tsx` | `<SignedIn>` / `<SignedOut>`, `<SignInButton>`, `<UserButton>`, the web app's top bar shape. |
| `components/ui/*`, `app/globals.css`, `app/fonts.tsx` | The Alternate Clouds web app's own shadcn primitives, palette and typeface, copied. |
| `app/page.tsx` | The `<SignIn>` card for visitors. |
| `app/dashboard/page.tsx` | A protected page reading `auth()`. |

## Calling your own API with the user's token

`auth()` returns `accessToken` on the server. It is an opaque token good for
the Alternate Clouds userinfo endpoint; pass it along from Route Handlers or
Server Actions, never to the browser.

## Look and feel

The starter is styled exactly like the Alternate Clouds web app: its shadcn
primitives, its `globals.css` palette (dark by default, light available on
`<html>` without the `dark` class) and Instrument Sans. `<AuthProvider
theme="inherit">` makes the sign-in components use that stylesheet. In an app
with its own design, drop the `inherit` and import
`@alternatefutures/ac-auth-react/styles.css` instead (`theme` `dark`, `light`
or `system`).

## Learn more

- Guide: https://docs.alternatefutures.ai/guides/add-sign-in
- Packages: `@alternatefutures/ac-auth-next`, `@alternatefutures/ac-auth-react`, `@alternatefutures/ac-auth`
