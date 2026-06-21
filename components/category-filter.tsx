"use client";

export default function CategoryFilter({ onFilter }: { onFilter?: (category: string) => void }) {
  const categories = [
    "All",
    "Portfolio",
    "Projects",
    "Career",
    "Marketing",
    "Personal"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter?.(e.target.value);
  };

  return (
    <select
      onChange={handleChange}
      className="rounded-xl border border-neutral-300 p-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white cursor-pointer min-w-[150px]"
    >
      {categories.map((item) => (
        <option key={item} value={item === "All" ? "" : item}>
          {item}
        </option>
      ))}
    </select>
  );
}
