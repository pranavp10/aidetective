import ToolCardSkeleton from "@/components/toolCard/toolCardSkeleton";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      <ToolCardSkeleton />
      <ToolCardSkeleton />
      <ToolCardSkeleton />
      <ToolCardSkeleton />
      <ToolCardSkeleton />
      <ToolCardSkeleton />
      <ToolCardSkeleton />
      <ToolCardSkeleton />
    </div>
  );
};

export default Loading;
