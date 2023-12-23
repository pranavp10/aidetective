"use client";

import { Button, Prompt, useToast } from "@medusajs/ui";
import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";

export const DeleteTool = ({
  onClose,
  open,
  toolId,
}: {
  open: boolean;
  onClose: () => void;
  toolId?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete<Tool>(`/api/admin/tools/${toolId}`);
      setIsLoading(false);
      onClose();
      mutate<Tool[]>("/api/admin/tools", async (oldData) => {
        if (oldData)
          return [...oldData.filter((tool) => tool.toolId !== data.toolId)];
      });
      mutate<Tool[]>("/api/admin/tools/unpublished", async (oldData) => {
        if (oldData)
          return [...oldData.filter((tool) => tool.toolId !== data.toolId)];
      });
      toast({
        title: "Success",
        description: "Tool deleted",
        variant: "success",
        duration: 2000,
      });
    } catch (e: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "unable to Delete Tool",
        variant: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Prompt open={open} onOpenChange={onClose}>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Delete Tool</Prompt.Title>
          <Prompt.Description>
            Are you sure? This cannot be undone.
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel disabled={isLoading} onClick={onClose}>
            Cancel
          </Prompt.Cancel>
          <Button variant="danger" onClick={onDelete} isLoading={isLoading}>
            Delete
          </Button>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};
