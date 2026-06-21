import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function ShowcasePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("links").select("*").order("clicks", { ascending: false }).limit(20);

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 space-y-10">
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Showcase</span>
        <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900">Trending Links</h1>
        <p className="max-w-xl text-neutral-500">Discover what developers and creators are sharing right now.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data && data.length > 0 ? data.map((item: any) => (
          <div key={item.id} className="border rounded-2xl p-6 bg-white hover:border-black transition-all hover:shadow-md cursor-pointer flex flex-col justify-between h-40">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 truncate">{item.title || "Untitled Link"}</h3>
              <p className="text-xs text-neutral-400 mt-1 truncate">/{item.slug}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs font-medium px-2 py-1 bg-neutral-100 text-neutral-600 rounded">{item.category || "General"}</span>
              <span className="text-sm font-bold text-blue-600">{item.clicks} clicks</span>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 text-center text-neutral-500 border rounded-2xl bg-neutral-50 border-dashed">
            No links have been created or clicked yet. Start creating and sharing to trend here!
          </div>
        )}
      </div>
    </main>
  );
}
