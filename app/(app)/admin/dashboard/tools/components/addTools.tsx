"use client";
import { Plus } from "@medusajs/icons";
import { Button, Drawer, useToast } from "@medusajs/ui";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Name } from "./fields/name";
import { Description } from "./fields/description";
import { ToolsSchema, toolsSchema } from "@/schema/tools.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Summary } from "./fields/summary";
import { Pricing } from "./fields/pricing";
import { WebsiteURl } from "./fields/websiteUrl";
import { PlayStoreURL } from "./fields/playStoreURL";
import { AppStoreURL } from "./fields/appStoreURL";
import { FeatureAt } from "./fields/featuredAt";
import { IsToolPublished } from "./fields/isToolPublished";
import { Tags } from "./fields/tags";
import { PossibleUseCase } from "./fields/possibleUseCase";
import { ImageURL } from "./fields/imageUrls";
import axios from "axios";
import { mutate } from "swr";

export const AddTools = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ToolsSchema>({
    resolver: zodResolver(toolsSchema),
  });
  const { toast } = useToast();
  const { handleSubmit } = form;
  const addTool = async (value: ToolsSchema) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post<Tool>("/api/tools", {
        ...value,
      });
      mutate<Tool[]>("/api/tools", async (oldData) => {
        if (oldData) return [...oldData, data];
      });
      setIsLoading(false);
      setOpen(false);
      toast({
        title: "Success",
        description: "New tool add",
        variant: "success",
        duration: 2000,
      });
    } catch (e: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "unable to add tool",
        variant: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Drawer open={open}>
      <Drawer.Trigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          <Plus />
          Add Tool
        </Button>
      </Drawer.Trigger>
      <Drawer.Content onEscapeKeyDown={() => setOpen(false)}>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(addTool)}>
            <Drawer.Header className="max-w-7xl m-auto w-full">
              Add new AI tool
            </Drawer.Header>
            <Drawer.Body className="flex  flex-col gap-y-8 h-[calc(100vh-165px)] overflow-y-auto">
              <Name />
              <Description />
              <Summary />
              <PossibleUseCase />
              <ImageURL />
              <Tags />
              <Pricing />
              <FeatureAt />
              <WebsiteURl />
              <PlayStoreURL />
              <AppStoreURL />
              <IsToolPublished />
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.Close asChild>
                <Button
                  disabled={isLoading}
                  onClick={() => setOpen(false)}
                  variant="secondary"
                >
                  Cancel
                </Button>
              </Drawer.Close>
              <Button type="submit" isLoading={isLoading}>
                Save
              </Button>
            </Drawer.Footer>
          </form>
        </FormProvider>
      </Drawer.Content>
    </Drawer>
  );
};