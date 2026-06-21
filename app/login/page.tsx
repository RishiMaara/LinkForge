"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  async function signIn() {
    if (!email) { alert("Please enter a valid email address."); return; }
    const supabase = createClient();
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    });
    const isMock = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (isMock) window.location.href = "/dashboard";
    else alert("Check your email for the magic link!");
  }

  return (
    <main className="mx-auto max-w-md py-32 px-6">
      <div className="border rounded-3xl p-8 bg-white shadow-xs space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Login</h1>
          <p className="text-sm text-neutral-500 mt-2">Enter your email to sign in or create an account with OTP.</p>
        </div>
        <div className="space-y-4">
          <input
            className="w-full rounded-xl border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            placeholder="Email Address" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="button" onClick={signIn}
            className="w-full rounded-xl bg-black py-3 text-sm font-bold text-white hover:bg-neutral-800 transition shadow-sm cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
