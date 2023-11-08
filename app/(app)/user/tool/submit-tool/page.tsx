"use client";
import { AppStoreURL } from "@/app/(app)/admin/dashboard/tools/components/fields/appStoreURL";
import { Description } from "@/app/(app)/admin/dashboard/tools/components/fields/description";
import { ImageURL } from "@/app/(app)/admin/dashboard/tools/components/fields/imageUrl";
import { IsToolPublished } from "@/app/(app)/admin/dashboard/tools/components/fields/isToolPublished";
import { Name } from "@/app/(app)/admin/dashboard/tools/components/fields/name";
import { PlayStoreURL } from "@/app/(app)/admin/dashboard/tools/components/fields/playStoreURL";
import { PossibleUseCase } from "@/app/(app)/admin/dashboard/tools/components/fields/possibleUseCase";
import { Pricing } from "@/app/(app)/admin/dashboard/tools/components/fields/pricing";
import { Slug } from "@/app/(app)/admin/dashboard/tools/components/fields/slug";
import { Summary } from "@/app/(app)/admin/dashboard/tools/components/fields/summary";
import { Tags } from "@/app/(app)/admin/dashboard/tools/components/fields/tags";
import { WebsiteURl } from "@/app/(app)/admin/dashboard/tools/components/fields/websiteUrl";
import { ToolsSchema, toolsSchema } from "@/schema/tools.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMark } from "@medusajs/icons";
import { Button, Heading, IconButton, Text, useToast } from "@medusajs/ui";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { mutate } from "swr";

const Page = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ToolsSchema>({
    resolver: zodResolver(toolsSchema),
  });

  const { toast } = useToast();
  const { handleSubmit } = form;

  const addTool = async (value: ToolsSchema) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.set("file", value.imageURL);
      const { data } = await axios.post<Tool>("/api/tools", {
        ...value,
        imageURL: "-",
      });
      await axios.post(`/api/tools/${data.toolId}/image-upload`, formData);
      setIsLoading(false);
      toast({
        title: "Success",
        description: "New tool add",
        variant: "success",
        duration: 2000,
      });
      mutate<Tool[]>("/api/tools", async (oldData) => {
        if (oldData)
          return [
            ...oldData,
            {
              ...data,
              imageURL: `https://res.cloudinary.com/playgod/image/upload/v1696266264/superflex/tools/${data.toolId}`,
            },
          ];
      });
      push("/user/tool");
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
    <div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(addTool)} className="max-w-xl m-auto mb-4">
          <div className="flex items-center justify-between pt-3 px-2">
            <div>
              <Heading>Submit new Tool</Heading>
              <Text className="max-w-md leading-4">
                Ones you submit a new tool it will take some time to be
                available on the market place
              </Text>
            </div>
            <IconButton type="button" onClick={() => push("/user/tool")}>
              <XMark className="cursor-pointer" />
            </IconButton>
          </div>
          <div className="flex  flex-col gap-y-8 overflow-y-auto mt-4 px-2">
            <Name />
            <Slug />
            <Description />
            <Summary />
            <PossibleUseCase />
            <ImageURL />
            <Tags />
            <Pricing />
            <WebsiteURl />
            <PlayStoreURL />
            <AppStoreURL />
            <IsToolPublished hideContent />
            <Button type="submit" isLoading={isLoading} className="w-full">
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
