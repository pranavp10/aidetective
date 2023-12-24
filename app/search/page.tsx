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
  const page = Number(searchParams?.page) || 1;
  const tools = await searchTool({ page, query });

  return <div>{tools && <ToolCardLayout tools={tools} listView />}</div>;
}
