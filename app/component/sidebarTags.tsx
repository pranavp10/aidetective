"use client";
import useShowNavbar from "@/hooks/useShowNavbar";
import { Text } from "@medusajs/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarTagsPops = {
  tags?: Tag[];
};

const SidebarTags = ({ tags }: SidebarTagsPops) => {
  const pathname = usePathname();
  const showNaveBar = useShowNavbar();

  if (showNaveBar) {
    return (
      <aside className="border-ui-border-base w-sidebar relative hidden h-full border-r lg:block">
        <div className="sticky inset-x-0 bottom-0 h-screen w-full">
          <div className="h-full w-full overflow-y-auto p-4">
            <div className="h-full w-full">
              <ul className="txt-compact-small-plus grid grid-flow-row auto-rows-max gap-0.5">
                {tags?.map(({ name, slug, tagId, emoji }) => (
                  <li key={tagId}>
                    <Link
                      href={`/categories/${slug}`}
                      className={`group flex w-full items-center rounded-md border transition-all hover:bg-ui-bg-base-hover gap-3 px-3 py-1.5
                    ${
                      pathname === `/categories/${slug}`
                        ? "bg-ui-bg-base-pressed text-ui-fg-base border-ui-border-base"
                        : "border-transparent text-ui-fg-subtle"
                    }`}
                    >
                      <Text className="border border-ui-border-base flex items-center rounded-md px-1 py-0.5">
                        {emoji}
                      </Text>
                      <Text>{name}</Text>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    );
  }
  return <></>;
};

export default SidebarTags;
