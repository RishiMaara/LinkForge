"use client";
import { useState } from "react";
import CategoryFilter from "@/components/category-filter";
import LinkSearch from "@/components/link-search";
import LinkTable from "@/components/link-table";
import type { Link } from "@/types/database";

export default function LinksDashboard({ links }: { links: Link[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = links.filter((l) => {
    // Category filter: if a category is set, filter by it; otherwise show all
    const matchesCategory = !category || (l as any).category === category;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (l.title?.toLowerCase().includes(q) ?? false) ||
      (l.slug?.toLowerCase().includes(q) ?? false) ||
      (l.destination_url?.toLowerCase().includes(q) ?? false);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap items-center">
        <LinkSearch onSearch={setSearch} />
        <CategoryFilter onFilter={setCategory} />
        {(search || category) && (
          <button
            type="button"
            onClick={() => { setSearch(""); setCategory(""); }}
            className="text-xs text-neutral-500 hover:text-neutral-800 font-medium underline underline-offset-2"
          >
            Clear filters
          </button>
        )}
        <span className="text-xs text-neutral-400 ml-auto">
          {filtered.length} of {links.length} links
        </span>
      </div>
      <LinkTable links={filtered} />
    </div>
  );
}
