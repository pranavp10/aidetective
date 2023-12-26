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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aidetective.xyz/"),
  title: {
    default: `AI Detective: Uncover Tomorrow's Solutions Today with our AI Tool Aggregator`,
    template: `%s | AI Detective`,
  },
  description: `Unleash the potential of AI tools with AI Detective – your ultimate destination for cutting-edge artificial intelligence solutions. Navigate a world of innovation effortlessly using our AI-powered search. Explore, discover, and find the perfect AI tools tailored to your needs. Dive into the future of technology with AI Detective – where intelligent search meets a spectrum of possibilities in artificial intelligence.`,
  verification: {
    google:
      "google-site-verification=lDuo9MpUwGQ20xL2-fbirg6Dngt_uFTr77_R_8DAvE0",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

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
        className={`bg-ui-bg-base text-ui-fg-base ${inter.className} w-full h-full`}
      >
        <ToastProvider />
        <Suspense>
          <PostHogPageview />
        </Suspense>
        <PHProvider>
          <SessionProvider session={session}>
            <SWRProvider>{children}</SWRProvider>
          </SessionProvider>
        </PHProvider>
      </body>
    </html>
  );
}
