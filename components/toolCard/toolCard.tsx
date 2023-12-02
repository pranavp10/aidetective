/* eslint-disable @next/next/no-img-element */
"use client";
import { Heading, Text } from "@medusajs/ui";
import { useRouter } from "next/navigation";
import { ToolBookmark } from "./toolBookmark/toolBookmark";

export const ToolCard = ({ tool }: { tool: Tool }) => {
  const { push } = useRouter();
  return (
    <div
      className="rounded-lg cursor-pointer gap-3 relative flex bg-gray-100/60 hover:shadow-md px-3 py-2 items-center"
      onClick={() => push(`/tool/${tool.slug}`)}
    >
      <div className="absolute right-2 top-2">
        <ToolBookmark id={tool.toolId} size={20} />
      </div>
      <img
        src={tool.imageURL !== "-" ? tool.imageURL : "/noImg.png"}
        alt={`${tool.name} landing page`}
        className="rounded-md w-14 h-14 object-cover"
      />
      <div>
        <Heading className="line-clamp-1">{tool.name}</Heading>
        <Text size="xsmall" className="line-clamp-2 text-gray-500 leading-4 ">
          {tool.description}
        </Text>
      </div>
    </div>
  );
};
