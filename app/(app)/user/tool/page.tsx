"use client";
import { ToolCard } from "@/components/toolCard/toolCard";
import { Spinner } from "@medusajs/icons";
import useSWR from "swr";

const Page = () => {
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
      {data?.map((tool) => (
        <ToolCard tool={tool} key={tool.toolId} />
      ))}
    </div>
  );
};

export default Page;
