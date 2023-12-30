"use client";
import { Button } from "@medusajs/ui";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Github, Google } from "@medusajs/icons";

const AuthButton = () => {
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
  }, [data]);

  return (
    <Button
      variant="secondary"
      size="large"
      className="w-full"
      onClick={() => signIn("google")}
    >
      <Google />
      Continue with Google
    </Button>
  );
};

export default AuthButton;
