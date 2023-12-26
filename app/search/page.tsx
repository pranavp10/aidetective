import { searchTool } from "@/fetch/getToolsTags";
import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const tools = await searchTool({ page: 1, query });

  return <div>{tools && <ToolCardLayout tools={tools} listView />}</div>;
}
