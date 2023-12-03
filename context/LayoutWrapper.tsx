"use client";
import SidebarTags from "@/app/component/sidebarTags";
import { SubmitTool } from "@/components/cta/submitTool";
import NavBar from "@/components/layout/navbar";
import useShowNavbar from "@/hooks/useShowNavbar";

export default function LayoutWrapper({
  children,
  tags,
}: {
  children: React.ReactNode;
  tags?: Tag[];
}) {
  const showNaveBar = useShowNavbar();

  if (showNaveBar) {
    return (
      <div className="grid w-full grid-cols-1 px-0 lg:mx-auto lg:grid-cols-[280px_1fr]">
        <SidebarTags tags={tags} />
        <div className="w-full h-screen overflow-y-auto">
          <div className="container px-4 py-3 md:px-8 mx-auto max-w-7xl">
            <NavBar />
            <div>
              <div className="my-10">
                <SubmitTool />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
