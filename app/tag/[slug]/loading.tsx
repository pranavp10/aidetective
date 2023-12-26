import ToolCardSkeleton from "@/components/toolCard/toolCardSkeleton";

const Loading = () => {
  return (
    <div>
      <div className="flex gap-4 pb-8 pt-8 items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-md" />
        <div>
          <div className="h-6 w-32 bg-gray-300 mb-1 rounded-md" />
          <div className="h-4 w-20 bg-gray-300 rounded-md" />
        </div>
      </div>
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
    </div>
  );
};

export default Loading;
