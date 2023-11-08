import { ToolCard } from "@/components/toolCard/toolCard";
import { prisma } from "@/lib/prisma";
import { MagnifyingGlass } from "@medusajs/icons";

const getTools = async () => {
  try {
    const tool = await prisma.tools.findMany({
      include: { tags: true },
    });
    return tool;
  } catch (e) {
    return null;
  }
};
const Page = async () => {
  const tools = await getTools();
  if (tools) {
    return (
      <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
        <div className="container px-4 py-3 md:px-8 mx-auto mt-10 max-w-7xl">
          {/* <div className="flex justify-center w-full mb-10">
            <div className="relative h-full w-full">
              <div className="absolute right-0 h-full p-3">
                <div className="bg-ui-bg-interactive  flex items-center w-20 justify-center rounded-full h-full">
                  <MagnifyingGlass className="text-white" />
                </div>
              </div>
              <input
                className="border text-4xl pl-10 py-4 pr-4 rounded-full w-full"
                placeholder="i want to create"
              />
            </div>
          </div> */}
          <div className="grid grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard tool={tool} key={tool.toolId} />
            ))}
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <div className="container px-4 py-3 md:px-8 mx-auto mt-10">
        No tools found
      </div>
    );
  }
};

export default Page;
