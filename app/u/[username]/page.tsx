import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ username: string }> }

export default async function PublicProfile({ params }: Props) {
  const { username } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profiles").select("*").eq("username", username).single();

  if (!profile) return (
    <main className="mx-auto max-w-md py-32 text-center space-y-4">
      <h1 className="text-4xl font-bold text-neutral-900">Profile Not Found</h1>
      <p className="text-neutral-500">The developer profile you are looking for does not exist.</p>
    </main>
  );

  const { data: links } = await supabase.from("bio_links").select("*").eq("profile_id", profile.id).order("sort_order");

  return (
    <main className="mx-auto max-w-2xl px-6 py-20 space-y-10">
      <div className="text-center space-y-4">
        <div className="h-24 w-24 rounded-full bg-neutral-200 mx-auto flex items-center justify-center text-neutral-500 font-bold text-2xl border-4 border-white shadow-md">
          {(profile.display_name || username).charAt(0).toUpperCase()}
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">{profile.display_name || username}</h1>
          {profile.headline && <p className="text-lg font-medium text-neutral-500">{profile.headline}</p>}
        </div>
        {profile.bio && <p className="max-w-md mx-auto text-neutral-600 text-sm leading-relaxed">{profile.bio}</p>}
      </div>
      <div className="space-y-4 max-w-md mx-auto">
        {links && links.length > 0 ? links.map((link: any) => (
          <a key={link.id} href={link.url} target="_blank" rel="noreferrer"
            className="block rounded-2xl border bg-white p-4 text-center font-semibold text-neutral-800 hover:bg-neutral-50 hover:border-black transition-all shadow-xs">
            {link.title}
          </a>
        )) : <p className="text-center text-neutral-500 text-sm py-8">No links shared yet.</p>}
      </div>
    </main>
  );
}
