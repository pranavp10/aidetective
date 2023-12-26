"use client";
import { mappedTags } from "@/data/tags";
import { Text } from "@medusajs/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TagsList = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-wrap gap-2.5 items-center justify-center px-4 py-3 md:px-8 max-w-7xl m-auto">
      <li key="all">
        <Link
          href="/"
          className={`group flex w-full items-center rounded-full border transition-all border-ui-border-base hover:bg-ui-bg-base-hover gap-2 px-3 py-1
                    ${
                      pathname === `/`
                        ? "bg-ui-bg-base-pressed text-ui-fg-base "
                        : "border-transparent text-ui-fg-subtle"
                    }`}
        >
          <Text>🎉</Text>
          <Text className="text-gray-900 font-medium">All Tools</Text>
        </Link>
      </li>
      {mappedTags.map(({ name, slug, emoji }) => (
        <li key={slug}>
          <Link
            href={`/tag/${slug}`}
            className={`group flex w-full items-center rounded-full border transition-all border-ui-border-base hover:bg-ui-bg-base-hover gap-2 px-3 py-1
                    ${
                      pathname === `/tag/${slug}`
                        ? "bg-ui-bg-base-pressed text-ui-fg-base "
                        : "border-transparent text-ui-fg-subtle"
                    }`}
          >
            <Text>{emoji}</Text>
            <Text className="text-gray-900 font-medium">{name}</Text>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TagsList;
