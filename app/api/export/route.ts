import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data } = await supabase.from("links").select("*").eq("user_id", user?.id);

  if (!data || data.length === 0) {
    return new Response("No links found", { status: 404, headers: { "Content-Type": "text/plain" } });
  }

  const csv = [
    "Title,Slug,Destination URL,Clicks,Created At",
    ...data.map((row: any) =>
      `"${row.title || ""}","${row.slug || ""}","${row.destination_url || ""}",${row.clicks || 0},"${row.created_at || ""}"`
    )
  ].join("\n");

  return new Response(csv, {
    headers: { "Content-Type": "text/csv", "Content-Disposition": 'attachment; filename="links.csv"' }
  });
}
