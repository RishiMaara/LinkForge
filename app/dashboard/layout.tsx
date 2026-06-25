import { AppSidebar } from "@/components/app-sidebar";
import { MainNav } from "@/components/main-nav";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (

    <div className="flex h-screen w-full bg-neutral-50 overflow-hidden">
      <AppSidebar user={user} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <MainNav user={user} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}
