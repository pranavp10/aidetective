import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container grid w-full grid-cols-1 px-0 lg:mx-auto lg:grid-cols-[280px_1fr]">
      <Sidebar />
      {children}
    </div>
  );
}
