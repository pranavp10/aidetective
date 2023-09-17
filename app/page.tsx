"use client";

import { Heading } from "@medusajs/ui";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      push("/dashboard");
    }
  }, [status, push]);

  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
      <Heading>Coming soon</Heading>
    </main>
  );
}
