import { createClient } from "@/lib/supabase/server";
import ClickChart from "@/components/click-chart";

function safeHostname(referrer: string): string {
  try {
    return new URL(referrer).hostname;
  } catch {
    return referrer;
  }
}

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: links } = await supabase.from("links").select("*").eq("user_id", user!.id);
  const { data: allClicks } = await supabase.from("clicks").select("*");
  const myLinkIds = new Set((links || []).map((l: any) => l.id));
  const clicks = (allClicks || []).filter((c: any) => myLinkIds.has(c.link_id));

  const total = clicks.length;
  const browsers: Record<string, number> = {};
  const devices: Record<string, number> = {};
  const referrers: Record<string, number> = {};
  const dailyCounts: Record<string, number> = {};
  clicks.forEach((c: any) => {
    browsers[c.browser] = (browsers[c.browser] || 0) + 1;
    devices[c.device] = (devices[c.device] || 0) + 1;
    const ref = c.referrer || "Direct";
    referrers[ref] = (referrers[ref] || 0) + 1;
    const day = c.visited_at?.slice(0, 10) || "Unknown";
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Analytics</h1>
        <p className="text-neutral-500 text-sm mt-1">Track your link performance in real time.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-2xl bg-white p-6 shadow-xs"><span className="text-sm font-medium text-neutral-500">Total Clicks</span><p className="text-3xl font-extrabold mt-1">{total}</p></div>
        <div className="border rounded-2xl bg-white p-6 shadow-xs"><span className="text-sm font-medium text-neutral-500">Unique Browsers</span><p className="text-3xl font-extrabold mt-1">{Object.keys(browsers).length}</p></div>
        <div className="border rounded-2xl bg-white p-6 shadow-xs"><span className="text-sm font-medium text-neutral-500">Devices</span><p className="text-3xl font-extrabold mt-1">{Object.keys(devices).length}</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border rounded-2xl bg-white p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-neutral-900">Clicks Over Time</h2>
          <ClickChart data={Object.entries(dailyCounts).sort().map(([date, count]) => ({ date, count }))} />
        </div>
        <div className="border rounded-2xl bg-white p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-neutral-900">Browser Breakdown</h2>
          {Object.entries(browsers).map(([b, c]) => (
            <div key={b} className="flex justify-between text-sm"><span className="text-neutral-600">{b}</span><span className="font-bold">{c}</span></div>
          ))}
          {Object.keys(browsers).length === 0 && <p className="text-sm text-neutral-500">No data yet</p>}
        </div>
        <div className="border rounded-2xl bg-white p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-neutral-900">Device Breakdown</h2>
          {Object.entries(devices).map(([d, c]) => (
            <div key={d} className="flex justify-between text-sm"><span className="text-neutral-600">{d}</span><span className="font-bold">{c}</span></div>
          ))}
          {Object.keys(devices).length === 0 && <p className="text-sm text-neutral-500">No data yet</p>}
        </div>
        <div className="border rounded-2xl bg-white p-6 shadow-xs space-y-4">
          <h2 className="font-bold text-neutral-900">Referrer Sources</h2>
          {Object.entries(referrers).map(([r, c]) => (
            <div key={r} className="flex justify-between text-sm"><span className="text-neutral-600">{r === "Direct" ? r : safeHostname(r)}</span><span className="font-bold">{c}</span></div>
          ))}
          {Object.keys(referrers).length === 0 && <p className="text-sm text-neutral-500">No data yet</p>}
        </div>
      </div>
    </div>
  );
}
