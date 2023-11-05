"use client";

import { Button, Input, Label, Prompt, useToast } from "@medusajs/ui";
import { useEffect, useState } from "react";
import axios from "axios";
import { mutate } from "swr";

export const EditTag = ({
  tag,
  onClose,
  open,
}: {
  tag?: Tag;
  open: boolean;
  onClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [updatedTag, setUpdatedTag] = useState<string>("");

  useEffect(() => {
    setUpdatedTag(tag?.name || "");
  }, [tag]);

  const saveTag = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.put<Tag>(`/api/admin/tags/${tag?.tagId}`, {
        name: updatedTag,
      });
      mutate<Tag[]>("/api/admin/tags", async (oldData) => {
        if (oldData)
          return [
            ...oldData.map((tag) => (data.tagId === tag.tagId ? data : tag)),
          ];
      });
      setIsLoading(false);
      onClose();
      toast({
        title: "Success",
        description: "update tag",
        variant: "success",
        duration: 2000,
      });
    } catch (e: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "unable to update tag",
        variant: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Prompt open={open}>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Update Tag</Prompt.Title>
          <Prompt.Description>
            All tools will be updated with the new tags
          </Prompt.Description>
        </Prompt.Header>
        <div className="px-6 pt-4">
          <Label>Tag Name</Label>
          <Input
            value={updatedTag}
            onChange={(e) => setUpdatedTag(e.target.value)}
          />
        </div>
        <Prompt.Footer>
          <Prompt.Cancel disabled={isLoading} onClick={onClose}>
            Cancel
          </Prompt.Cancel>
          <Button isLoading={isLoading} onClick={saveTag}>
            Update Tag
          </Button>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};
