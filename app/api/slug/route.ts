import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return Response.json({ available: false, error: "Missing slug" }, { status: 400 });
  const supabase = await createClient();
  const { data } = await supabase.from("links").select("id").eq("slug", slug).maybeSingle();
  return Response.json({ available: !data });
}
