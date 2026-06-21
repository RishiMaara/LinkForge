import { createBrowserClient } from "@supabase/ssr";
import { mockDb } from "@/lib/mock-db";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!url || !anonKey) {
    const uid = "12345678-1234-1234-1234-123456789012";
    const isLoggedIn = () => typeof window !== "undefined" && document.cookie.includes("linkforge-dev-user-session=");

    return {
      auth: {
        getUser: async () => isLoggedIn()
          ? { data: { user: { id: uid, email: "dev@linkforge.app" } }, error: null }
          : { data: { user: null }, error: null },
        getSession: async () => isLoggedIn()
          ? { data: { session: { user: { id: uid, email: "dev@linkforge.app" } } }, error: null }
          : { data: { session: null }, error: null },
        signInWithOtp: async ({ email }: { email: string }) => {
          document.cookie = `linkforge-dev-user-session=${email}; path=/; max-age=${86400 * 30}`;
          return { data: {}, error: null };
        },
        signOut: async () => {
          document.cookie = "linkforge-dev-user-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          return { error: null };
        }
      },
      from: (table: string) => mockDb.from(table as any),
    } as any;
  }

  return createBrowserClient(url, anonKey);
}
