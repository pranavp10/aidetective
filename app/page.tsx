import { getToolsTags } from "@/fetch/getToolsTags";
import InfiniteScrollTools from "./component/infiniteScrollTools";

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
