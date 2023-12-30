"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, FocusModal, Heading, Input, Label, Text } from "@medusajs/ui";
import { BadgeCheck } from "lucide-react";
import { ToolCardList } from "../toolCard/toolCardList";
import { ToolCard } from "../toolCard/toolCard";

const PaymentSuccessModal = ({ tool }: { tool: Tool }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const success = Boolean(searchParams.get("success"));
  const paramsToolId = searchParams.get("toolId");

  const onClose = () => {
    router.push("/dashboard");
  };

  return (
    <FocusModal open={!!(paramsToolId && success)} onOpenChange={onClose}>
      <FocusModal.Content className="z-50 max-w-2xl m-auto max-h-96 overflow-y-auto">
        <FocusModal.Body className="flex flex-col items-center justify-center">
          <div className="text-center flex justify-center items-center flex-col gap-3">
            <div className="flex gap-4 items-center">
              <BadgeCheck
                className="bg-green-500 text-white p-1 rounded-full"
                size={35}
              />
              <Heading>Payment success</Heading>
            </div>
            <div className="max-w-xs">
              <ToolCard tool={{ ...tool }} />
            </div>
            <Button size="large" className="w-36" onClick={onClose}>
              Done
            </Button>
          </div>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
};

export default PaymentSuccessModal;
