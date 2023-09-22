"use client";
import { Plus } from "@medusajs/icons";
import { Button, Input, Label, Prompt, useToast } from "@medusajs/ui";
import { useState } from "react";
import axios from "axios";
export const AddTag = () => {
  const [open, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tag, setTag] = useState("");
  const { toast } = useToast();

  const saveTag = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/tags", {
        name: tag,
      });
      setIsLoading(false);
      setModal(false);
      toast({
        title: "Success",
        description: "New tag add",
        variant: "success",
        duration: 2000,
      });
    } catch (e: any) {
      console.log(e.response.data.error);
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
    <Prompt open={open}>
      <Button variant="secondary" onClick={() => setModal((open) => !open)}>
        <Plus />
        Add Tags
      </Button>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Add Tag</Prompt.Title>
          <Prompt.Description>
            Tags are associated with the tools
          </Prompt.Description>
        </Prompt.Header>
        <div className="px-6 pt-4">
          <Label>Tag Name</Label>
          <Input value={tag} onChange={(e) => setTag(e.target.value)} />
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
