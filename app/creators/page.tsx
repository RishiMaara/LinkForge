import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const revalidate = 60;

export default async function CreatorsPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase.from("profiles").select("*");
  const { data: links } = await supabase.from("links").select("user_id, clicks");

  const creators = (profiles || []).map((p: any) => {
    const userLinks = (links || []).filter((l: any) => l.user_id === p.user_id);
    return { ...p, totalClicks: userLinks.reduce((a: number, l: any) => a + (l.clicks || 0), 0), totalLinks: userLinks.length };
  }).sort((a: any, b: any) => b.totalClicks - a.totalClicks).slice(0, 20);

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 space-y-10">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Leaderboard</span>
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900">Top Creators</h1>
        <p className="text-neutral-500">Meet the most active developers and creators using LinkForge.</p>
      </div>
      <div className="border rounded-2xl bg-white overflow-hidden shadow-xs">
        {creators.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">No creator profiles yet. Set up your profile to be the first!</div>
        ) : (
          <div className="divide-y">
            {creators.map((creator: any, index: number) => (
              <div key={creator.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-neutral-50/50 transition">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-neutral-400 w-6">#{index + 1}</span>
                  <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 font-bold border shrink-0">
                    {(creator.display_name || creator.username || "?").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <Link href={`/u/${creator.username}`} className="font-bold text-neutral-900 hover:text-blue-600 hover:underline block text-lg">
                      {creator.display_name || creator.username}
                    </Link>
                    <span className="text-sm text-neutral-500 block leading-tight">{creator.headline || "Developer"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 sm:gap-12 pl-10 sm:pl-0">
                  <div className="text-center sm:text-right"><span className="text-xs text-neutral-400 font-medium block uppercase">Links</span><span className="text-lg font-bold text-neutral-800">{creator.totalLinks}</span></div>
                  <div className="text-center sm:text-right"><span className="text-xs text-neutral-400 font-medium block uppercase">Views</span><span className="text-lg font-bold text-blue-600">{creator.totalClicks}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
