"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("profiles").upsert({
    user_id: user.id,
    username: formData.get("username") as string,
    display_name: formData.get("display_name") as string,
    headline: formData.get("headline") as string,
    bio: formData.get("bio") as string,
  }, { onConflict: "user_id" });
  if (error) throw error;
  revalidatePath("/dashboard/profile");
}
