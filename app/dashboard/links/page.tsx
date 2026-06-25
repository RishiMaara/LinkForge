import { createClient } from "@/lib/supabase/server";
import CreateLinkForm from "@/components/create-link-form";
import LinksDashboard from "@/components/links-dashboard";
import StatsCard from "@/components/stats-card";

export default async function LinksPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const totalClicks = (links || []).reduce((a: number, l: any) => a + (l.clicks || 0), 0);
  const activeLinks = (links || []).filter((l: any) => l.is_active).length;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">My Links</h1>
          <p className="text-neutral-500 text-sm mt-1">Create, manage, and track all your short links.</p>
        </div>
        <a
          href="/api/export"
          download
          className="rounded-xl bg-white border border-neutral-200 px-4 py-2.5 text-sm font-semibold hover:bg-neutral-50 transition shrink-0"
        >
          Export CSV
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard label="Total Links" value={links?.length || 0} color="bg-black" />
        <StatsCard label="Active Links" value={activeLinks} color="bg-blue-600" />
        <StatsCard label="Total Clicks" value={totalClicks} color="bg-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <LinksDashboard links={links || []} />
        </div>
        <div>
          <CreateLinkForm />
        </div>
      </div>
    </div>
  );
}
