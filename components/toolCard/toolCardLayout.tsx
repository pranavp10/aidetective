import { ToolCard } from "./toolCard";
import { ToolCardList } from "./toolCardList";

type ToolCardLayoutProps = { tools: Tool[]; listView?: boolean };

export const ToolCardLayout = ({ tools, listView }: ToolCardLayoutProps) => {
  return (
    <div
      className={
        listView
          ? "flex flex-col gap-4"
          : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
      }
    >
      {tools.map((tool) =>
        listView ? (
          <ToolCardList tool={tool} key={tool.toolId} />
        ) : (
          <ToolCard tool={tool} key={tool.toolId} />
        )
      )}
    </div>
  );
};
