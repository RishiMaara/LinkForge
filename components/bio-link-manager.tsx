"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBioLink, deleteBioLink } from "@/actions/bio";
import type { BioLink } from "@/types/database";

interface Props {
  initialLinks: BioLink[];
  linkCount: number;
}

export default function BioLinkManager({ initialLinks, linkCount }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  async function addLink() {
    if (!title || !url) { setError("Both title and URL are required."); return; }
    setAdding(true);
    setError("");
    try {
      const fd = new FormData();
      fd.set("title", title);
      fd.set("url", url);
      fd.set("sort_order", String(linkCount + 1));
      await createBioLink(fd);
      setTitle("");
      setUrl("");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Failed to add link.");
    } finally {
      setAdding(false);
    }
  }

  async function removeLink(id: string) {
    setDeletingId(id);
    try {
      const fd = new FormData();
      fd.set("id", id);
      await deleteBioLink(fd);
      router.refresh();
    } catch {
      setError("Failed to delete link. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <div className="border rounded-2xl bg-white p-6 shadow-xs space-y-4">
        <h2 className="font-bold text-neutral-900">Add a Link</h2>
        <div className="flex gap-3 flex-wrap">
          <input
            className="flex-1 border rounded-xl px-4 py-2 text-sm min-w-[140px]"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="flex-1 border rounded-xl px-4 py-2 text-sm min-w-[200px]"
            placeholder="https://..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="button"
            onClick={addLink}
            disabled={adding}
            className="rounded-xl bg-black text-white px-6 py-2 text-sm font-bold hover:bg-neutral-800 transition cursor-pointer disabled:opacity-50"
          >
            {adding ? "Adding..." : "Add"}
          </button>
        </div>
        {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
      </div>

      <div className="border rounded-2xl bg-white p-6 shadow-xs space-y-4">
        <h2 className="font-bold text-neutral-900">Your Bio Links</h2>
        {initialLinks.length === 0 ? (
          <p className="text-sm text-neutral-500">No links yet.</p>
        ) : (
          <div className="divide-y">
            {initialLinks.map((l) => (
              <div key={l.id} className="py-3 flex justify-between items-center gap-3">
                <span className="font-medium text-neutral-900">{l.title}</span>
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs text-neutral-400 truncate max-w-[200px]">{l.url}</span>
                  <button
                    type="button"
                    onClick={() => removeLink(l.id)}
                    disabled={deletingId === l.id}
                    className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {deletingId === l.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
