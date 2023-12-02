"use client";
import { Button } from "@medusajs/ui";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus } from "@medusajs/icons";

export const SubmitTool = () => {
  const { status } = useSession();
  const { push } = useRouter();
  return (
    <Button
      className="rounded-full"
      variant="primary"
      onClick={() => {
        if (status === "authenticated") {
          push("/user/tool/submit-tool");
        } else {
          signIn("google", { callbackUrl: "/user/tool/submit-tool" });
        }
      }}
    >
      <Plus />
      {"Submit Tool"}
    </Button>
  );
};
