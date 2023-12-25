import NavBar from "@/components/layout/navbar";
import SearchInput from "@/components/searchInput/searchInput";
import React from "react";
import { Footer } from "../component/footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <SearchInput />
      <div className="px-4 py-3 md:px-8 max-w-7xl m-auto">{children}</div>
      <Footer />
    </div>
  );
}
