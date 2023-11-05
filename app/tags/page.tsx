import { prisma } from "@/lib/prisma";
import { Badge, Heading } from "@medusajs/ui";
import Link from "next/link";

const getTags = async () => {
  try {
    return await prisma.tags.findMany();
  } catch (e) {
    return null;
  }
};

const Tags = async () => {
  const tags = await getTags();

  if (tags) {
    return (
      <main className="container flex items-center justify-between px-4 py-3 md:px-8 mx-auto">
        <div>
          <Heading level="h1" className="text-4xl text-center w-full mt-4">
            <Badge className="text-4xl mb-6">Tags</Badge>
          </Heading>
          <div className="flex gap-3 justify-center items-center flex-wrap">
            {tags?.map((tag: Tag) => (
              <Link key={tag.tagId} href={`/tag/${tag.slug}`}>
                <Badge className="text-lg">{tag.name}</Badge>
              </Link>
            ))}
          </div>
        </div>
      </main>
    );
  }
  return <div>Error loading tags</div>;
};

export default Tags;
