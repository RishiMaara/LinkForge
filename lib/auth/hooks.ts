"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useSession() {
  const [data, setData] = useState<any>({ session: null, user: null });
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      setData({ session, user: session?.user });
      setStatus(session ? "authenticated" : "unauthenticated");
    });
  }, []);

  return { data, status };
}

export async function signIn(provider: string, options?: any) {
  const supabase = createClient();
  if (provider === "google") {
    return supabase.auth.signInWithOAuth({ provider: "google" });
  }
}

export async function signOut() {
  const supabase = createClient();
  return supabase.auth.signOut();
}
