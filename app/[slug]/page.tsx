import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

interface Props { params: Promise<{ slug: string }> }

export default async function RedirectPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: link } = await supabase.from("links").select("*").eq("slug", slug).single();

  if (!link) return <h1>Link not found</h1>;
  if (!link.is_active) return <h1>Inactive link</h1>;
  if (link.expires_at && new Date(link.expires_at) < new Date()) return <h1>Link expired</h1>;
  if (link.password) {
    redirect(`/${slug}/password`);
  }
  if (link.one_time) { await supabase.from("links").update({ is_active: false }).eq("id", link.id); }

  const headerList = await headers();
  const ua = headerList.get("user-agent") || "";
  const referrer = headerList.get("referer") || "";
  let device = "Desktop", browser = "Unknown", os = "Unknown";
  if (/mobile/i.test(ua)) device = "Mobile";
  if (/tablet/i.test(ua)) device = "Tablet";
  if (ua.includes("Chrome")) browser = "Chrome";
  if (ua.includes("Firefox")) browser = "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  if (ua.includes("Windows")) os = "Windows";
  if (ua.includes("Mac")) os = "macOS";
  if (ua.includes("Android")) os = "Android";
  if (ua.includes("iPhone")) os = "iOS";

  await supabase.from("clicks").insert({ link_id: link.id, country: "Unknown", city: "Unknown", device, browser, os, referrer });
  await supabase.from("links").update({ clicks: link.clicks + 1, last_clicked_at: new Date().toISOString() }).eq("id", link.id);

  redirect(link.destination_url);
}
