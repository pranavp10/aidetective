import "./globals.css";
import type { Metadata } from "next";
import { Carlito } from "next/font/google";
import SessionProvider from "@/context/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import SWRProvider from "@/context/SWRProvider";
import { ToastProvider } from "@/context/ToastProvider";
import { PHProvider, PostHogPageview } from "@/context/PostHogProvider";
import { Suspense } from "react";
import { getTags } from "@/fetch/getToolsTags";
import LayoutWrapper from "@/context/LayoutWrapper";

const inter = Carlito({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
});

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
      <body
        className={`bg-ui-bg-base text-ui-fg-base ${inter.className} h-screen overflow-hidden`}
      >
        <ToastProvider />
        <Suspense>
          <PostHogPageview />
        </Suspense>
        <PHProvider>
          <SessionProvider session={session}>
            <SWRProvider>
              <LayoutWrapper tags={tags}>{children}</LayoutWrapper>
            </SWRProvider>
          </SessionProvider>
        </PHProvider>
      </body>
    </html>
  );
}
