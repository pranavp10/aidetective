"use client";
import { Footer } from "@/app/component/footer";
import SidebarTags from "@/app/component/sidebarTags";
import NavBar from "@/components/layout/navbar";
import useShowNavbar from "@/hooks/useShowNavbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const showNaveBar = useShowNavbar();

  if (showNaveBar) {
    return (
      <div className="grid w-full grid-cols-1 px-0 lg:mx-auto lg:grid-cols-[280px_1fr]">
        <SidebarTags />
        <div className="w-full h-screen overflow-y-auto relative">
          <div className="px-4 py-3 md:px-8 mx-auto max-w-7xl">
            <NavBar />
            <div className="pt-4">{children}</div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
