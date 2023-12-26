import InfiniteScrollTools from "@/components/component/infiniteScrollTools";
import { getToolsTags } from "@/fetch/getToolsTags";

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
      <InfiniteScrollTools initialTools={tools || []} pageNumber={page} />
    </div>
  );
};

export default Page;
