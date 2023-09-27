"use client";

import { Heading } from "@medusajs/ui";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { status, data } = useSession();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get("callbackUrl") || "/dashboard";

  useEffect(() => {
    if (status === "authenticated") {
      if (data.user.role === "SUPER_ADMIN") {
        push("/admin/dashboard");
      } else {
        push(callback);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
      <Heading>Coming soon</Heading>
    </main>
  );
}
