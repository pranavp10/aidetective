"use client";
import { ToolCard } from "@/components/toolCard/toolCard";
import { Spinner } from "@medusajs/icons";
import { Button, Text } from "@medusajs/ui";
import Link from "next/link";
import useSWR from "swr";

export const Page = () => {
  const { data, error, isLoading } = useSWR<Tool[]>("/api/tools");

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-195px)] flex justify-center items-center">
        <Spinner className="animate-spin" />
      </div>
    );
  }
  if (error) {
    return <div>Error loading Tools </div>;
  }

  return (
    <div className="container flex items-center justify-between px-4 py-3 md:px-8 mx-auto">
      {!data?.length && (
        <>
          <Link href="/user/tool/submit-tool" className="w-full flex">
            <div className="bg-ui-bg-component border-ui-border-base border flex  w-full p-4 rounded-lg justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <Text className="text-xl font-bold">Submit a tool</Text>
                  <Text>
                    We&apos;re always on the lookout for the latest and greatest
                    AI tools to add to our directory.
                  </Text>
                </div>
              </div>
              <div className="flex items-center">
                <Button>Submit tool</Button>
              </div>
            </div>
          </Link>
        </>
      )}
      {data?.map((tool) => (
        <ToolCard tool={tool} key={tool.toolId} />
      ))}
    </div>
  );
};

export default Page;