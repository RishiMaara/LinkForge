"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Background } from "@/components/ui/background";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/hooks";
import { Google } from "@/components/ui/icons";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus("idle");
    setErrorMsg("");
    try {
      const supabase = createClient();
      // Check if running in dev mode (no Supabase creds)
      const isDevMode = !process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (isDevMode) {
        // Dev mode: simulate OTP login by setting cookie and redirecting
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
        router.push("/dashboard");
        return;
      }
      // Production: Send OTP magic link
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setStatus("sent");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Failed to send sign-in link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <Background />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo className="h-12 w-12 text-black" />
        </div>
        <h2 className="mt-6 text-center font-display text-3xl font-extrabold text-neutral-900 tracking-tight">
          Sign in to LinkForge
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Intelligent link management platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-neutral-100">
          {status === "sent" ? (
            <div className="text-center space-y-4 py-4">
              <div className="text-4xl">📧</div>
              <h3 className="text-lg font-bold text-neutral-900">Check your email!</h3>
              <p className="text-sm text-neutral-600">
                We sent a sign-in link to <strong>{email}</strong>. Click the link in the email to sign in.
              </p>
              <button
                onClick={() => { setStatus("idle"); setEmail(""); }}
                className="text-sm text-blue-600 hover:underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <Button
                variant="outline"
                className="w-full h-11 bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-sm"
                onClick={() => signIn("google")}
                icon={<Google className="h-5 w-5 mr-2" />}
                text="Continue with Google"
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-neutral-500">Or continue with email</span>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleEmailSignIn}>
                <div>
                  <Label htmlFor="email" className="text-neutral-700">Email address</Label>
                  <div className="mt-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
                )}

                <div>
                  <Button
                    type="submit"
                    className="w-full h-11"
                    loading={loading}
                    text={loading ? "Sending link..." : "Sign in with Email"}
                  />
                </div>
              </form>

              <p className="text-center text-xs text-neutral-400">
                We&apos;ll email you a magic link to sign in instantly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
