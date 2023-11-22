"use client";
import { Button, Text } from "@medusajs/ui";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const SubmitTool = () => {
  const { status } = useSession();
  const { push } = useRouter();
  return (
    <div
      onClick={() => {
        if (status === "authenticated") {
          push("/user/tool/submit-tool");
          return;
        }
        signIn("google", { callbackUrl: "/user/tool/submit-tool" });
      }}
      className="w-full sm:flex cursor-pointer"
    >
      <div className="bg-ui-bg-component border-ui-border-base border sm:flex  w-full p-4 rounded-lg justify-between">
        <div className="flex items-center justify-start gap-4">
          <div>
            <Text className="text-xl font-bold">Submit tool for free</Text>
            <Text>
              We&apos;re always on the lookout for the latest and greatest AI
              tools to add to our directory.
            </Text>
          </div>
        </div>
        <div className="flex items-center sm:mt-1 mt-3">
          <Button>Submit tool</Button>
        </div>
      </div>
    </div>
  );
};
