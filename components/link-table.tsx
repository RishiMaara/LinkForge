"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Copy, Check, QrCode } from "lucide-react";
import QRCard from "@/components/qr-card";
import { deleteLink, toggleLinkActive } from "@/actions/links";

interface Props {
  links: any[];
}

export default function LinkTable({ links }: Props) {
  const router = useRouter();
  const [qrSlug, setQrSlug] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function handleToggle(id: string, current: boolean) {
    setPendingId(id);
    try {
      const fd = new FormData();
      fd.set("id", id);
      fd.set("current", String(current));
      await toggleLinkActive(fd);
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this link? This cannot be undone.")) return;
    setPendingId(id);
    try {
      const fd = new FormData();
      fd.set("id", id);
      await deleteLink(fd);
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  async function copyLink(slug: string, id: string) {
    await navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (links.length === 0) return (
    <div className="border rounded-2xl bg-white p-10 text-center border-dashed">
      <p className="text-neutral-500 font-medium">No links yet. Create your first one!</p>
    </div>
  );

  return (
    <>
      <div className="border rounded-2xl bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b text-xs uppercase tracking-wider text-neutral-500 font-semibold">
              <tr>
                <th className="text-left px-5 py-4">Title</th>
                <th className="text-left px-5 py-4">Slug</th>
                <th className="text-left px-5 py-4">Clicks</th>
                <th className="text-left px-5 py-4">Status</th>
                <th className="text-left px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {links.map((link: any) => (
                <tr key={link.id} className="hover:bg-neutral-50/50 transition">
                  <td className="px-5 py-4 font-medium text-neutral-900 max-w-[140px] truncate">{link.title || "Untitled"}</td>
                  <td className="px-5 py-4">
                    <Link href={`/${link.slug}`} className="text-blue-600 hover:underline font-mono text-xs">/{link.slug}</Link>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-neutral-800">{link.clicks}</span>
                    <span className="text-[10px] text-neutral-400 ml-1">clicks</span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      disabled={pendingId === link.id}
                      onClick={() => handleToggle(link.id, link.is_active)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full cursor-pointer disabled:opacity-50 ${link.is_active ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-red-50 text-red-700 hover:bg-red-100"}`}
                    >
                      {link.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => copyLink(link.slug, link.id)}
                        title="Copy link"
                        className="text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
                      >
                        {copiedId === link.id
                          ? <Check className="w-4 h-4 text-emerald-500" />
                          : <Copy className="w-4 h-4" />
                        }
                      </button>
                      <button
                        type="button"
                        onClick={() => setQrSlug(link.slug)}
                        title="Show QR code"
                        className="text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={pendingId === link.id}
                        onClick={() => handleDelete(link.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog.Root open={!!qrSlug} onOpenChange={(open) => !open && setQrSlug(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm z-50 focus:outline-none">
            <Dialog.Title className="sr-only">QR Code</Dialog.Title>
            {qrSlug && typeof window !== "undefined" && (
              <QRCard url={`${window.location.origin}/${qrSlug}`} />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
