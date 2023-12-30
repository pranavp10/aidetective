import { ToolCardAdmin } from "./toolCardAdmin";

type ToolCardAdminLayoutProps = { tools: Tool[] };

export const ToolCardAdminLayout = ({ tools }: ToolCardAdminLayoutProps) => (
  <div className="flex flex-col gap-4">
    {tools.map((tool) => (
      <ToolCardAdmin tool={tool} key={tool.toolId} />
    ))}
  </div>
);
