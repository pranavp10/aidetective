import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";
import { getToolsTags } from "@/fetch/getToolsTags";

export async function generateStaticParams() {
  return ["/"];
}

const Page = async () => {
  const tools = await getToolsTags();

  if (tools) {
    return (
      <div>
        <ToolCardLayout tools={tools} />
      </div>
    );
  } else {
    return <div>No tools found</div>;
  }
};

export default Page;
