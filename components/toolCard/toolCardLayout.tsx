import { ToolCard } from "./toolCard";

type ToolCardLayoutProps = { tools: Tool[] };

export const ToolCardLayout = ({ tools }: ToolCardLayoutProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {tools.map((tool) => (
        <ToolCard tool={tool} key={tool.toolId} />
      ))}
    </div>
  );
};
