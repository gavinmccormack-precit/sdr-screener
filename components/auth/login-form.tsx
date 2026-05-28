"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { useAsyncAction } from "@/hooks/use-async-action";
import { BrandHeader } from "@/components/layout/brand-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { TextLink } from "@/components/ui/text-link";
import { IconBadge } from "@/components/ui/icon-badge";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { loading, run } = useAsyncAction();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    await run(async () => {
      // TODO: supabase.auth.signInWithOtp({ email })
      setSent(true);
    }, 600);
  }

  return (
    <Card className="w-full max-w-md border-stone/10">
      <CardHeader>
        <BrandHeader description="Sign in with your email. We'll send you a magic link." />
      </CardHeader>
      <CardContent>
        {sent ? (
          <div className="space-y-4 text-center">
            <IconBadge icon={Mail} />
            <p className="text-sm text-charcoal">
              Check <span className="font-medium">{email}</span> for your
              sign-in link.
            </p>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setSent(false)}
            >
              Use a different email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Work email" htmlFor="email">
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </FormField>
            <LoadingButton
              type="submit"
              className="w-full"
              loading={loading}
              loadingText="Sending…"
            >
              Send magic link
            </LoadingButton>
          </form>
        )}
        <p className="mt-6 text-center text-xs text-stone">
          Demo: <TextLink href="/upload">Continue to dashboard</TextLink>
        </p>
      </CardContent>
    </Card>
  );
}
