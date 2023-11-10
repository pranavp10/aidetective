/* eslint-disable @next/next/no-img-element */
"use client";
import { Badge, Heading, Text } from "@medusajs/ui";
import { ToolBookmark } from "./bookmark/bookmark";
import { useRouter } from "next/navigation";

export const ToolCard = ({ tool }: { tool: Tool }) => {
  const { push } = useRouter();
  return (
    <div
      className="transition ease-in-out delay-150 border-2 border-ui-border-base hover:border-ui-border-loud rounded-lg hover:bg-ui-bg-base-hover cursor-pointer hover:scale-105 duration-300 h-full relative"
      onClick={() => push(`/tool/${tool.toolId}`)}
    >
      <div className="absolute right-0">
        <ToolBookmark id={tool.toolId} />
      </div>
      <img
        src={tool.imageURL !== "-" ? tool.imageURL : "/noImg.png"}
        alt={`${tool.name} landing page`}
        className=" rounded-t-md"
      />
      <div className="p-4">
        <Heading>{tool.name}</Heading>
        <Text className="line-clamp-3">{tool.description}</Text>
        <div className="mt-3 flex items-center gap-2">
          {[...tool.tags].slice(0, 2).map((tag: Tag) => (
            <Badge key={tag.tagId}>{tag.name}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
