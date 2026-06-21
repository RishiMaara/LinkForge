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
    const matchesCategory = !category || l.category === category;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      (l.title?.toLowerCase().includes(q) ?? false) ||
      (l.slug?.toLowerCase().includes(q) ?? false);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <LinkSearch onSearch={setSearch} />
        <CategoryFilter onFilter={setCategory} />
      </div>
      <LinkTable links={filtered} />
    </div>
  );
}
