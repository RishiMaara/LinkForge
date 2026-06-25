"use client";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { createProfile } from "@/actions/profile";
import { toast } from "sonner";

export default function ProfileForm() {
  const supabase = createClient();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (profile) {
        setUsername(profile.username || "");
        setDisplayName(profile.display_name || "");
        setHeadline(profile.headline || "");
        setBio(profile.bio || "");
      }
    }
    load();
  }, []);

  async function saveProfile() {
    setSaving(true);
    const formData = new FormData();
    formData.set("username", username);
    formData.set("display_name", displayName);
    formData.set("headline", headline);
    formData.set("bio", bio);
    try {
      await createProfile(formData);
      toast.success("Profile saved successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="border rounded-2xl bg-white p-6 shadow-xs space-y-5 max-w-lg">
      <div className="space-y-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Username</label>
          <input className="w-full border rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-black" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="your-username" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Display Name</label>
          <input className="w-full border rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-black" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your Name" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Headline</label>
          <input className="w-full border rounded-xl px-4 py-2.5 text-sm mt-1 focus:outline-none focus:border-black" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Software Engineer" />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Bio</label>
          <textarea className="w-full border rounded-xl px-4 py-2.5 text-sm mt-1 min-h-[80px] focus:outline-none focus:border-black" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell your story..." />
        </div>
      </div>
      <button
        type="button"
        onClick={saveProfile}
        disabled={saving}
        className="rounded-xl bg-black text-white px-6 py-2.5 text-sm font-bold hover:bg-neutral-800 transition cursor-pointer disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
