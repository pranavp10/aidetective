"use client";
import { Footer } from "@/app/component/footer";
import NavBar from "@/components/layout/navbar";
import SearchInput from "@/components/searchInput/searchInput";
import TagsList from "@/components/tagsList/tagsList";
import useShowNavbar from "@/hooks/useShowNavbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const showNaveBar = useShowNavbar();

  if (showNaveBar) {
    return (
      <div>
        <NavBar />
        <SearchInput />
        <TagsList />
        <div className="px-4 py-3 md:px-8 max-w-7xl m-auto">{children}</div>
        <Footer />
      </div>
    );
  }
  return <>{children}</>;
}
