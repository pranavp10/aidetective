import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";
import { getToolsTags } from "@/fetch/getToolsTags";
import { Suspense } from "react";

const ToolsWrapper = async () => {
  const tools = await getToolsTags();

  return (
    <Suspense fallback={<div>Loading</div>}>
      {!!tools?.length ? (
        <ToolCardLayout tools={tools} />
      ) : (
        <div>No tools found</div>
      )}
    </Suspense>
  );
};

export default ToolsWrapper;
