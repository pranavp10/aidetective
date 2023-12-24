const ToolCardSkeleton = () => {
  return (
    <div className="rounded-lg cursor-pointer gap-3 relative flex bg-gray-100 hover:shadow-md px-3 py-2 flex-col group">
      <div className="animate-pulse">
        <div className="h-16 bg-gray-300 mb-4 rounded-md"></div>
        <div className="h-6 bg-gray-300 mb-2 rounded-md"></div>
        <div className="h-3 bg-gray-300 mb-1 rounded-md"></div>
        <div className="h-3 bg-gray-300 mb-4 rounded-md"></div>
        <div className="h-4 bg-gray-300 mb-2 rounded-full w-20"></div>
      </div>
    </div>
  );
};

export default ToolCardSkeleton;
