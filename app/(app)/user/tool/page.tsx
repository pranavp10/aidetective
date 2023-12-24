"use client";
import { ToolCard } from "@/components/toolCard/toolCard";
import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";
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
  if (error && !data) {
    return <div>Error loading Tools </div>;
  }

  return <div>{data && <ToolCardLayout tools={data} />}</div>;
};

export default Page;
