import { Metadata } from "next";
import { APISideBar } from "./components/apiSidebar";

export const metadata: Metadata = {
  title: "Top AI tools for your assistance",
  description: "Top AI tools for your assistance",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container grid w-full grid-cols-1 px-0 lg:mx-auto lg:grid-cols-[280px_1fr]">
      <APISideBar />
      <div className="relative flex w-full flex-1 items-start justify-center px-4 pb-8 pt-16 md:px-8 lg:px-16 lg:py-[112px]">
        <div className="h-full w-full lg:max-w-[720px] lg:px-px">
          {children}
        </div>
      </div>
    </div>
  );
}
