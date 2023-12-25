"use client";

import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";
import ToolCardSkeleton from "@/components/toolCard/toolCardSkeleton";
import { pageSize } from "@/data/constants";
import { getToolsTags } from "@/fetch/getToolsTags";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const InfiniteScrollTools = ({
  initialTools,
  pageNumber,
}: {
  pageNumber: number;
  initialTools: Tool[];
}) => {
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [page, setPage] = useState<number>(pageNumber);
  const [allToolsFetched, setAllToolsFetched] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadMoreTools = async () => {
    const nextPage = page + 1;
    const tools = await getToolsTags({ page: nextPage });
    if (tools?.length && !allToolsFetched) {
      if (tools.length < pageSize) setAllToolsFetched(true);
      setPage(nextPage);
      setTools((previousTools: Tool[]) => [...previousTools, ...tools]);
    }
  };

  useEffect(() => {
    if (inView) loadMoreTools();
  }, [inView]);

  return (
    <div>
      <ToolCardLayout tools={tools} />
      {!allToolsFetched && (
        <div ref={ref}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
            <ToolCardSkeleton />
            <ToolCardSkeleton />
            <ToolCardSkeleton />
            <ToolCardSkeleton />
            <ToolCardSkeleton />
            <ToolCardSkeleton />
            <ToolCardSkeleton />
            <ToolCardSkeleton />
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollTools;
