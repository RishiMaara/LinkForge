"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { createProfile } from "@/actions/profile";
import { toast } from "sonner";

export default function SettingsPage() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email || "");
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
      toast.success("Settings saved successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Settings</h1>
        <p className="text-neutral-500 text-sm mt-1">Manage your account and profile settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="border rounded-2xl bg-white p-6 shadow-xs space-y-5">
          <h2 className="font-bold text-neutral-900 text-lg">Profile Information</h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                Email
              </label>
              <input
                className="w-full border rounded-xl px-4 py-2.5 text-sm bg-neutral-50 text-neutral-500 cursor-not-allowed"
                value={email}
                readOnly
                placeholder="your@email.com"
              />
              <p className="text-xs text-neutral-400 mt-1">Email cannot be changed here.</p>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                Username
              </label>
              <input
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your-username"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                Display Name
              </label>
              <input
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                Headline
              </label>
              <input
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                Bio
              </label>
              <textarea
                className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black min-h-[80px]"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell your story..."
              />
            </div>
          </div>

          <button
            type="button"
            onClick={saveProfile}
            disabled={saving}
            className="rounded-xl bg-black text-white px-6 py-2.5 text-sm font-bold hover:bg-neutral-800 transition cursor-pointer disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>

        {/* Account Info */}
        <div className="space-y-4">
          <div className="border rounded-2xl bg-white p-6 shadow-xs space-y-4">
            <h2 className="font-bold text-neutral-900 text-lg">Public Profile URL</h2>
            {username ? (
              <div className="flex items-center gap-2 bg-neutral-50 rounded-xl px-4 py-3 border">
                <span className="text-sm text-neutral-500 font-mono">linkforge.app/u/</span>
                <span className="text-sm font-bold text-neutral-900 font-mono">{username}</span>
              </div>
            ) : (
              <p className="text-sm text-neutral-500">Set a username above to get your public profile URL.</p>
            )}
            <p className="text-xs text-neutral-400">
              Share this URL on your resume or socials to showcase your links.
            </p>
          </div>

          <div className="border rounded-2xl bg-white p-6 shadow-xs space-y-4">
            <h2 className="font-bold text-neutral-900 text-lg">Danger Zone</h2>
            <p className="text-sm text-neutral-500">
              Account deletion is permanent and cannot be undone. All your links, bio data, and analytics will be lost.
            </p>
            <button
              type="button"
              className="rounded-xl border border-red-200 text-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-50 transition cursor-pointer"
              onClick={() => alert("Please contact support to delete your account.")}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
