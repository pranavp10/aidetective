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
import { ImageURL } from "./fields/imageUrl";
import axios from "axios";
import { mutate } from "swr";
import { Slug } from "./fields/slug";

export const AddTools = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ToolsSchema>({
    resolver: zodResolver(toolsSchema),
  });

  const { toast } = useToast();
  const { handleSubmit, reset } = form;
  const resetOnclose = () => {
    reset({
      appStoreURL: "",
      description: "",
      featuredAt: new Date().toString(),
      imageURL: null,
      isToolPublished: true,
      name: "",
      playStoreURL: "",
      possibleUseCase: "",
      pricing: "free_trail_no_card",
      summary: "",
      tags: [],
      websiteURL: "",
      slug: "",
    });
  };
  const addTool = async (value: ToolsSchema) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.set("file", value.imageURL);
      const { data } = await axios.post<Tool>("/api/admin/tools", {
        ...value,
        imageURL: "-",
      });
      await axios.post(
        `/api/admin/tools/${data.toolId}/image-upload`,
        formData
      );
      mutate<Tool[]>("/api/admin/tools", async (oldData) => {
        if (oldData)
          return [
            ...oldData,
            {
              ...data,
              imageURL: `https://res.cloudinary.com/playgod/image/upload/v1696266264/superflex/tools/${data.toolId}`,
            },
          ];
      });
      setIsLoading(false);
      setOpen(false);
      toast({
        title: "Success",
        description: "New tool add",
        variant: "success",
        duration: 2000,
      });
      resetOnclose();
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
              <Slug />
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
                  onClick={() => {
                    setOpen(false);
                    resetOnclose();
                  }}
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
