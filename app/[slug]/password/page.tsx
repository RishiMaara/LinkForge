"use client";
import { useState, use } from "react";
import { verifyLinkPassword } from "@/actions/links";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function PasswordPage({ params }: Props) {
  const { slug } = use(params);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setSubmitting(true);
    setError("");
    const result = await verifyLinkPassword(slug, password);
    if (result.ok) {
      window.location.href = result.destinationUrl;
    } else {
      setError("Incorrect password. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-md py-24 px-6">
      <div className="border rounded-3xl p-8 bg-white shadow-xs space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Protected Link</h1>
          <p className="text-sm text-neutral-500 mt-2">This link is password protected. Enter the password to continue.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            className="w-full rounded-xl border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-600 font-medium">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-black py-3 text-sm font-bold text-white hover:bg-neutral-800 transition shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Checking..." : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
