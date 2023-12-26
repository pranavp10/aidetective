import { Footer } from "@/components/layout/footer";
import NavBar from "@/components/layout/navbar";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <div className="px-4 py-3 md:px-8 max-w-7xl m-auto">{children}</div>
      <Footer />
    </div>
  );
}
