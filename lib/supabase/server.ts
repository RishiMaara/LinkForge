import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { mockDb } from "@/lib/mock-db";

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    const cookieStore = await cookies();
    const devCookie = cookieStore.get("linkforge-dev-user-session");
    const uid = "12345678-1234-1234-1234-123456789012";

    return {
      auth: {
        getUser: async () => {
          const email = devCookie?.value || "dev@linkforge.app";
          return devCookie
            ? { data: { user: { id: uid, email } }, error: null }
            : { data: { user: null }, error: null };
        },
        getSession: async () => {
          const email = devCookie?.value || "dev@linkforge.app";
          return devCookie
            ? { data: { session: { user: { id: uid, email } } }, error: null }
            : { data: { session: null }, error: null };
        },
        signInWithOtp: async ({ email }: { email: string }) => {
          cookieStore.set("linkforge-dev-user-session", email, { maxAge: 86400 * 30, path: "/" });
          return { data: {}, error: null };
        },
        exchangeCodeForSession: async () => ({ data: { session: {} }, error: null }),
        signOut: async () => {
          cookieStore.set("linkforge-dev-user-session", "", { maxAge: -1, path: "/" });
          return { error: null };
        }
      },
      from: (table: string) => mockDb.from(table as any),
    } as any;
  }

  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      }
    }
  });
}
