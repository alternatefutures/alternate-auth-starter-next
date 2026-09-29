import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { auth, signInPath } from '@/lib/auth';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
      <Label className="text-muted-foreground sm:w-40 sm:shrink-0">{label}</Label>
      <div className="min-w-0 flex-1 text-sm break-all">{children}</div>
    </div>
  );
}

/** A protected page: the proxy already redirects anonymous visitors; this is the belt to its braces. */
export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect(signInPath('/dashboard'));
  const { user } = session;
  const none = <span className="text-muted-foreground">none</span>;
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Dashboard</CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-2">
          <span>Signed in as {user.name ?? user.email ?? user.key}.</span>
          <Badge variant="outline">{session.status}</Badge>
          <span>Access token valid until {new Date(session.expiresAt).toLocaleTimeString()}.</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Row label="Local user key"><code>{user.key}</code></Row>
        <Separator />
        <Row label="Subject"><code>{user.id}</code></Row>
        <Separator />
        <Row label="Name">{user.name ?? none}</Row>
        <Separator />
        <Row label="Email">
          {user.email ?? none}
          {user.emailVerified ? <Badge variant="secondary" className="ml-2">verified</Badge> : null}
        </Row>
        <Separator />
        <Row label="Primary wallet">{user.wallet ? <code>{user.wallet}</code> : none}</Row>
        <Separator />
        <Row label="All wallets">{user.wallets.length ? user.wallets.map((w) => <code key={w} className="mr-2">{w}</code>) : none}</Row>
        <Separator />
        <Row label="Organization">
          {user.org ? (
            <span>
              {user.org.name} <Badge variant="outline">{user.org.role}</Badge>
            </span>
          ) : (
            <span className="text-muted-foreground">not requested (add the org scope)</span>
          )}
        </Row>
        <Separator />
        <Row label="Scopes"><code>{session.scope ?? '-'}</code></Row>
      </CardContent>
    </Card>
    </main>
  );
}
