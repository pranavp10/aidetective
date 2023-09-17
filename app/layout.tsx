import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/context/SessionProvider";
import { getServerSession } from "next-auth";
import NavBar from "@/components/layout/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Top AI tools for your assistance",
  description: "Top AI tools for your assistance",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`bg-ui-bg-base text-ui-fg-base ${inter.className}`}>
        <SessionProvider session={session}>
          <NavBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
