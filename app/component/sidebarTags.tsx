"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarTagsPops = {
  tags?: Tag[];
};

const SidebarTags = ({ tags }: SidebarTagsPops) => {
  const pathname = usePathname();

  return (
    <aside className="border-ui-border-base w-sidebar relative hidden h-full border-r lg:block">
      <div className="sticky inset-x-0 bottom-0 h-screen w-full">
        <div className="h-full w-full overflow-y-auto">
          <div className="h-full w-full p-4">
            <ul className="txt-compact-small-plus grid grid-flow-row auto-rows-max gap-0.5">
              {tags?.map(({ name, slug, tagId }) => (
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
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarTags;
