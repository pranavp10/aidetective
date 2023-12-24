import { getToolsTags } from "@/fetch/getToolsTags";
import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const page = Number(searchParams?.page) || 1;
  const tools = await getToolsTags({ page });

  return (
    <div className="pt-6">
      {!!tools?.length ? (
        <ToolCardLayout tools={tools} />
      ) : (
        <div>No tools found</div>
      )}
    </div>
  );
};

export default Page;
