"use client";
import { ToolCard } from "@/components/toolCard/toolCard";
import { Spinner } from "@medusajs/icons";
import { Text } from "@medusajs/ui";
import useSWR from "swr";

export const Bookmark = () => {
  const { data, error, isLoading } = useSWR<Tool[]>("/api/bookmark");

  if (error && !data) return <div>Error loading Bookmark </div>;

  if (isLoading)
    return (
      <div className="h-28 flex justify-center items-center">
        <Spinner className="animate-spin" />
      </div>
    );

  return (
    <div className="flex gap-4 overflow-y-auto items-center">
      {data?.map((tool) => (
        <ToolCard tool={tool} key={tool.toolId} />
      ))}
      {!data?.length && <Text>No bookmark yet</Text>}
    </div>
  );
};
