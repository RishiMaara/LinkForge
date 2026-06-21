"use client";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => { supabase.auth.getUser().then(({ data }: { data: any }) => setUser(data.user)); }, [supabase.auth]);

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  }

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-neutral-900">LinkForge</Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/pricing" className="hover:text-neutral-800 transition text-neutral-500">Pricing</Link>
          <Link href="/showcase" className="hover:text-neutral-800 transition text-neutral-500">Showcase</Link>
          <Link href="/creators" className="hover:text-neutral-800 transition text-neutral-500">Creators</Link>
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="rounded-lg bg-black px-4 py-2 text-white hover:bg-neutral-800 transition font-semibold">Dashboard</Link>
              <button type="button" onClick={signOut} className="text-neutral-500 hover:text-black transition cursor-pointer font-medium">Logout</button>
            </div>
          ) : (
            <Link href="/login" className="rounded-lg bg-black px-4 py-2 text-white hover:bg-neutral-800 transition font-semibold">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
