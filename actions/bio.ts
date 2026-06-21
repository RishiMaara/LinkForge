"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createBioLink(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Look up or create the profile for this user
  let { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    // Auto-create a minimal profile so bio links can be added
    const { data: newProfile } = await supabase.from("profiles").upsert({
      user_id: user.id,
      username: user.email?.split("@")[0] || "user",
      display_name: "",
      headline: "",
      bio: "",
    }, { onConflict: "user_id" });
    // Re-fetch after upsert
    const { data: refetched } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();
    profile = refetched;
  }

  if (!profile) throw new Error("Could not find or create profile");

  const sortOrder = parseInt(formData.get("sort_order") as string) || 0;

  const { error } = await supabase.from("bio_links").insert({
    profile_id: profile.id,
    title: formData.get("title") as string,
    url: formData.get("url") as string,
    sort_order: sortOrder,
  });
  if (error) throw error;
  revalidatePath("/dashboard/bio");
}

export async function deleteBioLink(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing id");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { error } = await supabase.from("bio_links").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard/bio");
}
