"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // TODO: supabase.auth.signInWithOtp({ email })
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-md border-stone/10">
      <CardHeader className="text-center">
        <p className="font-serif text-sm uppercase tracking-[0.2em] text-stone">
          Click Theory Capital
        </p>
        <CardTitle className="font-serif text-3xl text-charcoal">
          SDR Screener
        </CardTitle>
        <CardDescription>
          Sign in with your email. We&apos;ll send you a magic link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sent ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-dried-grass/40">
              <Mail className="h-6 w-6 text-terracotta" />
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending…" : "Send magic link"}
            </Button>
          </form>
        )}
        <p className="mt-6 text-center text-xs text-stone">
          Demo:{" "}
          <Link
            href="/upload"
            className="font-medium text-terracotta underline-offset-2 hover:underline"
          >
            Continue to dashboard
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
