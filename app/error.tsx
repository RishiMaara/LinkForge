"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-6 py-24 text-center">
      <div className="space-y-4 max-w-md">
        <span className="text-4xl">⚠️</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
          Something went wrong
        </h1>
        <p className="text-neutral-500 text-sm">
          {error.message || "An unexpected error occurred. Please try again later."}
        </p>
        <button
          onClick={() => reset()}
          className="mt-4 rounded-xl bg-black px-5 py-2.5 text-white font-medium hover:bg-neutral-800 transition"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
