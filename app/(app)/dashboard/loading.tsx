import ToolCardSkeleton from "@/components/toolCard/toolCardSkeleton";

const Loading = () => {
  return (
    <div>
      <div className="mt-4 grid gap-4">
        <div className="h-6 bg-gray-300 mb-4 rounded-md w-28" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <ToolCardSkeleton />
          <ToolCardSkeleton />
          <ToolCardSkeleton />
          <ToolCardSkeleton />
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        <div className="h-6 bg-gray-300 mb-4 rounded-md w-28" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <ToolCardSkeleton />
          <ToolCardSkeleton />
          <ToolCardSkeleton />
          <ToolCardSkeleton />
        </div>
      </div>
    </div>
  );
};

export default Loading;
