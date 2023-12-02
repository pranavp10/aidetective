import { SubmitTool } from "@/components/cta/submitTool";
import { ToolCard } from "@/components/toolCard/toolCard";
import { prisma } from "@/lib/prisma";

const getTools = async () => {
  try {
    const tool = await prisma.tools.findMany({
      include: { tags: true },
      where: {
        isToolPublished: true,
      },
    });
    return tool;
  } catch (e) {
    return null;
  }
};
const Page = async () => {
  const tools = await getTools();

  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
      <div className="container px-4 py-3 md:px-8 mx-auto mt-5 max-w-7xl">
        <div className="mb-10">
          <SubmitTool />
        </div>
        {!!tools && tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard tool={tool} key={tool.toolId} />
            ))}
            SubmitTool
          </div>
        ) : (
          <div className="container px-4 py-3 md:px-8 mx-auto mt-10">
            No tools found
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
