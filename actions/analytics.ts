"use server";
import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { totalLinks: 0, totalClicks: 0, topLink: null, recentLinks: [] };

  const { data: links } = await supabase.from("links").select("*").eq("user_id", user.id);
  const totalLinks = links?.length || 0;
  const totalClicks = links?.reduce((acc: number, l: any) => acc + (l.clicks || 0), 0) || 0;
  const topLink = links?.length ? links.reduce((prev: any, cur: any) => prev.clicks > cur.clicks ? prev : cur) : null;

  const { data: recentLinks } = await supabase
    .from("links").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);

  return { totalLinks, totalClicks, topLink, recentLinks: recentLinks || [] };
}
