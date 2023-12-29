"use client";
import { AppStoreURL } from "@/app/(app)/admin/dashboard/tools/components/fields/appStoreURL";
import { Description } from "@/app/(app)/admin/dashboard/tools/components/fields/description";
import { ImageURL } from "@/app/(app)/admin/dashboard/tools/components/fields/imageUrl";
import { IsToolPublished } from "@/app/(app)/admin/dashboard/tools/components/fields/isToolPublished";
import { IsToolFeatured } from "@/app/(app)/admin/dashboard/tools/components/fields/isToolFeatured";
import { Name } from "@/app/(app)/admin/dashboard/tools/components/fields/name";
import { PlayStoreURL } from "@/app/(app)/admin/dashboard/tools/components/fields/playStoreURL";
import { PossibleUseCase } from "@/app/(app)/admin/dashboard/tools/components/fields/possibleUseCase";
import { Pricing } from "@/app/(app)/admin/dashboard/tools/components/fields/pricing";
import { Tags } from "@/app/(app)/admin/dashboard/tools/components/fields/tags";
import { WebsiteURl } from "@/app/(app)/admin/dashboard/tools/components/fields/websiteUrl";
import { ToolsSchema, toolsSchema } from "@/schema/tools.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, RocketLaunch, Star, ArrowLeft } from "@medusajs/icons";
import { Button, Heading, IconButton, Text, useToast } from "@medusajs/ui";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { mutate } from "swr";
import Image from "next/image";
import Link from "next/link";

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
      push("/dashboard");
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
    <div className="relative isolate bg-white overflow-y-hidden h-full">
      <div className="mx-auto grid max-w-full grid-cols-1 lg:grid-cols-2 h-screen">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-16 lg:py-48">
          <div className="lg:mx-0 lg:max-w-xl">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    x="100%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill="white" />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                />
              </svg>
            </div>
            <Link href="/" className="flex items-center gap-3 mb-8">
              <Image
                src="/android-chrome-512x512.png"
                className="rounded-full"
                alt="logo of company"
                width={30}
                height={30}
              />
              <Heading>AI Detective</Heading>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Submit New Tool
            </h2>
            <Text
              className="leading-6 text-gray-600 mt-8 mb-8 flex items-start gap-2"
              style={{ fontSize: "1.1rem" }}
            >
              <RocketLaunch className="inline text-gray-500 w-10 h-10 mt-1" />{" "}
              Submit your product to get featured in our newsletter and reach
              over 15,000+ startup founders and AI enthusiasts!
            </Text>
            <Text
              className="leading-5 text-gray-600 mb-8 flex items-start gap-2"
              style={{ fontSize: "1.1rem" }}
            >
              <Star className="inline text-gray-500 w-6 h-6" /> Get discovered
              by thousands of potential customers and early-adopters.
            </Text>
            <Text
              className="leading-5 text-gray-600  flex items-start gap-2"
              style={{ fontSize: "1.1rem" }}
            >
              <Clock className="inline text-gray-500" /> It takes less than 1
              minute!
            </Text>
          </div>
        </div>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(addTool)}
            className="px-6 pb-24 pt-20 lg:px-14 overflow-y-auto"
          >
            <div className="max-w-xl lg:mr-0 lg:max-w-xl">
              <IconButton className="mb-8" variant="transparent">
                <ArrowLeft
                  onClick={() => push("/dashboard")}
                  className="cursor-pointer text-gray-800"
                />
              </IconButton>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <WebsiteURl />
                </div>
                <div className="sm:col-span-2">
                  <Name />
                </div>
                <div className="sm:col-span-2">
                  <Description />
                </div>
                <div className="sm:col-span-2">
                  <PossibleUseCase />
                </div>
                <div className="sm:col-span-2">
                  <ImageURL />
                </div>
                <div className="sm:col-span-2">
                  <Tags />
                </div>
                <div className="sm:col-span-2">
                  <Pricing />
                </div>
                <div className="sm:col-span-2">
                  <PlayStoreURL />
                </div>
                <div className="sm:col-span-2">
                  <AppStoreURL />
                </div>
                <div className="sm:col-span-2">
                  <IsToolPublished hideContent />
                </div>
                <div className="sm:col-span-2">
                  <IsToolFeatured hideContent />
                </div>
              </div>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full"
                size="large"
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
