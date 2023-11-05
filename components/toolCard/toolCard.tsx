import { Badge, Heading, Text } from "@medusajs/ui";
import Link from "next/link";

export const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <Link href={`/tool/${tool.toolId}`}>
      <div className="border border-ui-border-base rounded-md hover:bg-ui-bg-base-hover cursor-pointer">
        <img
          src={tool.imageURL}
          alt={`${tool.name} landing page`}
          className=" rounded-t-md"
        />
        <div className="p-4">
          <Heading>{tool.name}</Heading>
          <Text className="line-clamp-3">{tool.description}</Text>
          <div className="mt-3">
            {tool.tags.map((tag: Tag) => (
              <Badge key={tag.tagId}>{tag.name}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
