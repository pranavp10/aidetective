"use client";

import { Button, Prompt, useToast } from "@medusajs/ui";
import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";

export const DeleteTag = ({
  onClose,
  open,
  tagId,
}: {
  open: boolean;
  onClose: () => void;
  tagId?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete<Tag>(`/api/admin/tags/${tagId}`);
      setIsLoading(false);
      onClose();
      mutate<Tag[]>("/api/admin/tags", async (oldData) => {
        if (oldData)
          return [...oldData.filter((tag) => tag.tagId !== data.tagId)];
      });
      toast({
        title: "Success",
        description: "Tag deleted",
        variant: "success",
        duration: 2000,
      });
    } catch (e: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "unable to Delete tag",
        variant: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Prompt open={open}>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Delete something</Prompt.Title>
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
