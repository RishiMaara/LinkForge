import { NextResponse, type NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/dashboard")) return NextResponse.next();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    const devCookie = req.cookies.get("linkforge-dev-user-session");
    if (!devCookie) return NextResponse.redirect(new URL("/login", req.url));
    return NextResponse.next();
  }

  const { createServerClient } = await import("@supabase/ssr");
  const res = NextResponse.next();
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() { return req.cookies.getAll(); },
      setAll(cookiesToSet: any[]) { cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options)); }
    }
  });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.redirect(new URL("/login", req.url));
  return res;
}

export const config = { matcher: ["/dashboard/:path*"] };
