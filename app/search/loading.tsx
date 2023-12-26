import ToolCardSkeletonListView from "@/components/toolCard/toolCardSkeletonListView";

const Loading = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <ToolCardSkeletonListView />
      <ToolCardSkeletonListView />
      <ToolCardSkeletonListView />
    </div>
  );
};

export default Loading;
