"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Link2, 
  BarChart3, 
  User, 
  Settings
} from "lucide-react";

export default function DashboardNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Links",
      href: "/dashboard/links",
      icon: Link2
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3
    },
    {
      name: "Bio Page",
      href: "/dashboard/bio",
      icon: User
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: Settings
    }
  ];

  return (
    <nav className="space-y-1.5 px-3 py-6">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/15"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-neutral-400"}`} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
