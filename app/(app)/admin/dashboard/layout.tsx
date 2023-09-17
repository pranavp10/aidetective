import Sidebar from "@/app/(app)/admin/dashboard/components/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid w-full grid-cols-1 px-0 lg:mx-auto lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="min-h-screen bg-ui-bg-base-pressed">
        <div className="p-10 h-full w-full">
          <div className="flex h-full rounded-2xl bg-ui-bg-base p-10 w-full">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
