"use client";

import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer shrink-0"
      title="Sign Out"
    >
      <LogOut className="w-5 h-5" />
    </button>
  );
}
