"use client";
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

export const EditTools = ({
  tool,
  onClose,
}: {
  tool: Tool;
  onClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ToolsSchema>({
    resolver: zodResolver(toolsSchema),
    defaultValues: {
      name: tool.name,
      description: tool.description,
      appStoreURL: tool?.appStoreURL || "",
      isToolPublished: tool.isToolPublished,
      playStoreURL: tool?.playStoreURL || "",
      pricing: tool.pricing,
      summary: tool.summary,
      tags: tool.tags.map(({ tagId }: Tag) => tagId),
      websiteURL: tool.websiteURL,
      featuredAt: tool?.featuredAt?.toString() || new Date().toString(),
      possibleUseCase: tool.possibleUseCase,
      imageURL: tool?.imageURL,
      slug: tool.slug,
    },
  });
  const { toast } = useToast();
  const { handleSubmit } = form;
  const addTool = async (value: ToolsSchema) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put<Tool>(`/api/tools/${tool?.toolId}`, {
        ...value,
        imageURL: tool.imageURL,
      });
      if (typeof value.imageURL !== "string") {
        const formData = new FormData();
        formData.set("file", value.imageURL);
        await axios.post(`/api/tools/${data.toolId}/image-upload`, formData);
      }
      mutate<Tool[]>("/api/tools", async (oldData) => {
        if (oldData) return [...oldData, data];
      });
      setIsLoading(false);
      onClose();
      toast({
        title: "Success",
        description: "Updated tool",
        variant: "success",
        duration: 2000,
      });
    } catch (e: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "unable to update tool",
        variant: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Drawer open={!!tool}>
      <Drawer.Content onEscapeKeyDown={() => onClose()}>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(addTool)}>
            <Drawer.Header className="max-w-7xl m-auto w-full">
              Update AI tool
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
                  onClick={() => onClose()}
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
