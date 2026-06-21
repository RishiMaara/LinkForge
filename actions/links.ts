"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createLink(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("links").insert({
    title: formData.get("title") as string || "Untitled",
    slug: formData.get("slug") as string,
    destination_url: formData.get("url") as string,
    password: (formData.get("password") as string) || null,
    expires_at: (formData.get("expires_at") as string) || null,
    one_time: formData.get("one_time") === "on",
    user_id: user.id,
    is_active: true,
    clicks: 0,
  });
  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function deleteLink(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing id");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { error } = await supabase.from("links").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function toggleLinkActive(formData: FormData) {
  const id = formData.get("id") as string;
  const current = formData.get("current") === "true";
  if (!id) throw new Error("Missing id");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { error } = await supabase.from("links").update({ is_active: !current }).eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function verifyLinkPassword(
  slug: string,
  password: string
): Promise<{ ok: true; destinationUrl: string } | { ok: false }> {
  const supabase = await createClient();
  const { data: link } = await supabase
    .from("links")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!link || link.password !== password) return { ok: false };

  await supabase.from("clicks").insert({
    link_id: link.id,
    country: "Unknown",
    city: "Unknown",
    device: "Unknown",
    browser: "Unknown",
    os: "Unknown",
    referrer: "",
  });
  await supabase
    .from("links")
    .update({ clicks: link.clicks + 1, last_clicked_at: new Date().toISOString() })
    .eq("id", link.id);

  return { ok: true, destinationUrl: link.destination_url };
}
