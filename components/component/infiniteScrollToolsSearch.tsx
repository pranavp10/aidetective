"use client";

import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";
import { searchTool } from "@/fetch/getToolsTags";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ToolCardSkeletonListView from "../toolCard/toolCardSkeletonListView";

const InfiniteToolScrollSearch = ({
  initialTools,
  pageNumber,
  query,
}: {
  pageNumber: number;
  initialTools: Tool[];
  query: string;
}) => {
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [page, setPage] = useState<number>(pageNumber);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadMoreTools = async () => {
    const nextPage = page + 1;
    const tools = await searchTool({ page, query });
    if (tools?.length) {
      setPage(nextPage);
      setTools((previousTools: Tool[]) => [...previousTools, ...tools]);
    }
  };

  useEffect(() => {
    if (inView) loadMoreTools();
  }, [inView]);

  return (
    <div>
      <ToolCardLayout tools={tools} listView />
      <div ref={ref}>
        <div className="flex flex-col gap-4 mt-4">
          <ToolCardSkeletonListView />
          <ToolCardSkeletonListView />
          <ToolCardSkeletonListView />
        </div>
      </div>
    </div>
  );
};

export default InfiniteToolScrollSearch;
