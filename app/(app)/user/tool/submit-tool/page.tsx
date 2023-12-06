"use client";
import { AppStoreURL } from "@/app/(app)/admin/dashboard/tools/components/fields/appStoreURL";
import { Description } from "@/app/(app)/admin/dashboard/tools/components/fields/description";
import { ImageURL } from "@/app/(app)/admin/dashboard/tools/components/fields/imageUrl";
import { IsToolPublished } from "@/app/(app)/admin/dashboard/tools/components/fields/isToolPublished";
import { Name } from "@/app/(app)/admin/dashboard/tools/components/fields/name";
import { PlayStoreURL } from "@/app/(app)/admin/dashboard/tools/components/fields/playStoreURL";
import { PossibleUseCase } from "@/app/(app)/admin/dashboard/tools/components/fields/possibleUseCase";
import { Pricing } from "@/app/(app)/admin/dashboard/tools/components/fields/pricing";
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
        summary: "-",
      });
      if (value.imageURL)
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
        description: "Unable to add tool",
        variant: "error",
        duration: 2000,
      });
    }
  };
  return (
    <div className="overflow-y-auto h-full">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(addTool)} className="max-w-xl m-auto mb-4">
          <div className="flex items-center justify-between pt-3 px-2">
            <div>
              <Heading>Submit New Tool</Heading>
              <Text className="max-w-md leading-4 my-2">
                🚀 Submit your product to get featured in our newsletter and
                reach over 15,000+ startup founders and AI enthusaists!
              </Text>
              <Text className="max-w-md leading-4 mb-2">
                ⭐ Get discovered by thousands of potential customers and
                early-adopters.
              </Text>
              <Text className="max-w-md leading-4 mb-2">
                ⌛ It takes less than 1 minute!
              </Text>
            </div>
            <IconButton type="button" onClick={() => push("/user/tool")}>
              <XMark className="cursor-pointer" />
            </IconButton>
          </div>
          <div className="flex flex-col gap-y-2 overflow-y-auto mt-4 px-2">
            <WebsiteURl />
            <Name />
            <Description />
            <PossibleUseCase />
            <ImageURL />
            <Tags />
            <Pricing />
            <PlayStoreURL />
            <AppStoreURL />
            <IsToolPublished hideContent />
            <Button type="submit" isLoading={isLoading} className="w-full">
              Save
            </Button>
          </div>
          <Text className="max-w-md leading-4 my-2">
            Once you submit, it will take some time to reflect on the
            marketplace
          </Text>
          <Text className="max-w-md leading-4 mb-2">
            In case you are unable to submit, please send the info to
            hello@aidetective.xyz
          </Text>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
