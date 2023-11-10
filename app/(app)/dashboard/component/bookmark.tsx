"use client";
import { ToolCard } from "@/components/toolCard/toolCard";
import { Spinner } from "@medusajs/icons";
import { Text } from "@medusajs/ui";
import useSWR from "swr";

export const Bookmark = () => {
  const { data, error, isLoading } =
    useSWR<{ tools: Tool; bookmarkId: string }[]>("/api/bookmark");

  if (error && !data) return <div>Error loading Bookmark </div>;

  if (isLoading)
    return (
      <div className="h-28 flex justify-center items-center ">
        <Spinner className="animate-spin" />
      </div>
    );

  return (
    <div className="grid grid-cols-3 gap-6">
      {data?.map((bookmark) => (
        <ToolCard tool={bookmark.tools} key={bookmark.bookmarkId} />
      ))}
      {!data?.length && <Text>No bookmark yet</Text>}
    </div>
  );
};
