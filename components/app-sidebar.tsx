"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, BarChart2, Link as LinkIcon, Settings, LogOut, User, BookOpen } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function AppSidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: Home, exact: true },
    { name: "Links", href: "/dashboard/links", icon: LinkIcon, exact: false },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2, exact: false },
    { name: "Bio Page", href: "/dashboard/bio", icon: BookOpen, exact: false },
    { name: "Profile", href: "/dashboard/profile", icon: User, exact: false },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, exact: false },
  ];

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex w-64 flex-col border-r bg-white px-4 py-6 shadow-sm">
      <div className="flex h-12 items-center gap-2 mb-8 px-2">
        <Logo className="h-8 w-8 text-black" />
        <span className="text-xl font-bold font-display tracking-tight text-neutral-900">LinkForge</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-neutral-100 text-neutral-900"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 flex-shrink-0 transition-colors duration-200",
                  isActive ? "text-neutral-900" : "text-neutral-400 group-hover:text-neutral-600"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4 border-t pt-4">
        <div className="flex items-center gap-3 px-2">
          <Avatar user={{ name: user?.email, image: undefined }} />
          <div className="flex flex-col overflow-hidden">
            <span className="truncate text-sm font-medium text-neutral-900">
              {user?.email}
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-neutral-600 hover:text-red-600 hover:border-red-200"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
