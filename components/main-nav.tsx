"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export function MainNav({ user }: { user: any }) {
  const pathname = usePathname();

  // Helper to format the current path into a title
  const getTitle = () => {
    if (pathname === "/dashboard") return "Overview";
    const segment = pathname.split("/").pop();
    if (segment) return segment.charAt(0).toUpperCase() + segment.slice(1);
    return "Dashboard";
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-neutral-900">{getTitle()}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search links..."
            className="h-9 w-64 rounded-md border border-neutral-200 bg-neutral-50 pl-9 pr-4 text-sm outline-none transition-colors focus:border-neutral-300 focus:bg-white"
          />
        </div>
        
        <Button variant="outline" className="h-9 w-9 p-0 rounded-full border-neutral-200 text-neutral-500">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
