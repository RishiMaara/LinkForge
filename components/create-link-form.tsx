"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLink } from "@/actions/links";

export default function CreateLinkForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function generateSlug(inputUrl: string) {
    try {
      const u = new URL(inputUrl);
      const base = u.hostname.replace("www.", "").split(".")[0];
      const rand = Math.random().toString(36).slice(2, 6);
      return `${base}-${rand}`;
    } catch {
      return Math.random().toString(36).slice(2, 8);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url || !slug) { setError("URL and slug are required."); return; }
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("url", url);
      formData.set("slug", slug);
      await createLink(formData);
      setTitle("");
      setUrl("");
      setSlug("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to create link. The slug may already be taken.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-2xl bg-white p-6 shadow-xs space-y-4 sticky top-24">
      <h2 className="font-bold text-neutral-900">Create New Link</h2>
      <input
        className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
        placeholder="Link Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          if (!slug) setSlug(generateSlug(e.target.value));
        }}
      />
      <div className="flex items-center border rounded-xl px-4 py-2.5 text-sm bg-neutral-50">
        <span className="text-neutral-500 shrink-0">/</span>
        <input
          className="flex-1 ml-1 bg-transparent focus:outline-none"
          placeholder="my-slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
        />
        <button
          type="button"
          onClick={() => setSlug(generateSlug(url))}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium ml-2 shrink-0"
        >
          Generate
        </button>
      </div>
      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
      {success && <p className="text-sm text-emerald-600 font-medium">✓ Link created successfully!</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-black text-white text-sm font-bold py-2.5 hover:bg-neutral-800 transition disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Creating..." : "Create Link"}
      </button>
    </form>
  );
}
