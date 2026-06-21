"use client";

import { useState } from "react";

export default function LinkSearch({ onSearch }: { onSearch?: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch?.(val);
  };

  return (
    <input
      value={query}
      onChange={handleChange}
      placeholder="Search links..."
      className="w-full max-w-md rounded-xl border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
    />
  );
}
