import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkForge",
  description: "Create branded links, analytics dashboards, developer portfolio pages and bio links.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
