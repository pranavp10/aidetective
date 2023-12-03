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
    <div className="flex gap-4 flex-col">
      <Button variant="secondary" onClick={() => signIn("google")}>
        <Google />
        Login with Google
      </Button>
      <Button variant="secondary" onClick={() => signIn("github")}>
        <Github />
        Login with Github
      </Button>
    </div>
  );
};

export default AuthButton;
