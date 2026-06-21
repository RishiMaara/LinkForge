import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SidebarNav from "@/components/sidebar-nav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <aside className="w-64 border-r bg-white shrink-0 p-6 space-y-6 hidden md:block">
        <div className="space-y-1">
          <p className="text-lg font-bold text-neutral-900">LinkForge</p>
          <p className="text-xs text-neutral-500 truncate">{user.email}</p>
        </div>
        <SidebarNav />
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
