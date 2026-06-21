import { createClient } from "@/lib/supabase/server";
import BioLinkManager from "@/components/bio-link-manager";

export default async function BioPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Load profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  // Load bio links if profile exists
  const bioLinks = profile
    ? (await supabase
        .from("bio_links")
        .select("*")
        .eq("profile_id", profile.id)
        .order("sort_order", { ascending: true })
      ).data || []
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Bio Page</h1>
        <p className="text-neutral-500 text-sm mt-1">Add links to showcase on your public portfolio page.</p>
      </div>
      <BioLinkManager initialLinks={bioLinks} linkCount={bioLinks.length} />
    </div>
  );
}
