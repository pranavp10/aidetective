import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/context/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import SWRProvider from "@/context/SWRProvider";
import { ToastProvider } from "@/context/ToastProvider";
import { PHProvider, PostHogPageview } from "@/context/PostHogProvider";
import { Suspense } from "react";
import { getTags } from "@/fetch/getToolsTags";
import SidebarTags from "./component/sidebarTags";
import Link from "next/link";
import Image from "next/image";
import { Heading } from "@medusajs/ui";
import { SubmitTool } from "@/components/cta/submitTool";
import NavBar from "@/components/layout/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Detective - Explore Best AI Tools",
  description: "Top AI tools for your assistance",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const tags = await getTags();

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#b91d47" />
        <meta name="msapplication-TileColor" content="#b91d47" />
        <meta name="theme-color" content="#b91d47" />
      </head>
      <body className={`bg-ui-bg-base text-ui-fg-base ${inter.className}`}>
        <ToastProvider />
        <Suspense>
          <PostHogPageview />
        </Suspense>
        <PHProvider>
          <SessionProvider session={session}>
            <SWRProvider>
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
            </SWRProvider>
          </SessionProvider>
        </PHProvider>
      </body>
    </html>
  );
}
