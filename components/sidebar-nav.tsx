"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Links" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/bio", label: "Bio Page" },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 text-sm">
      {navItems.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`rounded-lg px-3 py-2 font-medium transition ${
              isActive
                ? "bg-neutral-100 text-neutral-900"
                : "text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
