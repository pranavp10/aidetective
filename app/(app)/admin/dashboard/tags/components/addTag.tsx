"use client";
import { Plus } from "@medusajs/icons";
import { Button, Input, Label, Prompt, useToast } from "@medusajs/ui";
import { useState } from "react";
import axios from "axios";
import { mutate } from "swr";

export const AddTag = () => {
  const [open, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tag, setTag] = useState("");
  const [emoji, setEmoji] = useState("");
  const { toast } = useToast();

  const saveTag = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post<Tag>("/api/admin/tags", {
        name: tag,
        emoji,
      });
      mutate<Tag[]>("/api/admin/tags", async (oldData) => {
        if (oldData) return [...oldData, data];
      });
      setIsLoading(false);
      setModal(false);
      toast({
        title: "Success",
        description: "New tag add",
        variant: "success",
        duration: 2000,
      });
      setTag("");
    } catch (e: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "unable to add tag",
        variant: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Prompt open={open} onOpenChange={setModal}>
      <Button variant="secondary" onClick={() => setModal((open) => !open)}>
        <Plus />
        Add Tag
      </Button>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Add Tag</Prompt.Title>
          <Prompt.Description>
            Tag are associated with the tools
          </Prompt.Description>
        </Prompt.Header>
        <div className="px-6 pt-4">
          <Label>Name</Label>
          <Input value={tag} onChange={(e) => setTag(e.target.value)} />
        </div>
        <div className="px-6 pt-4">
          <Label>Emoji</Label>
          <Input value={emoji} onChange={(e) => setEmoji(e.target.value)} />
        </div>
        <Prompt.Footer>
          <Prompt.Cancel
            disabled={isLoading}
            onClick={() => setModal((open) => false)}
          >
            Cancel
          </Prompt.Cancel>
          <Button isLoading={isLoading} onClick={saveTag}>
            Save
          </Button>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};
