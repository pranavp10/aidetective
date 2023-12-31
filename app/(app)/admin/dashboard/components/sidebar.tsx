"use client";
import { Avatar, Text } from "@medusajs/ui";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const list = getList(pathname);
  const { data: session } = useSession();

  return (
    <aside className="border-ui-border-base w-sidebar relative hidden h-full border-r lg:block">
      <div className="sticky inset-x-0 bottom-0 top-[56px] h-screen w-full">
        <div className="h-full w-full overflow-hidden">
          <div className="h-full w-full p-4">
            <div className="mb-4 px-3 py-1.5 flex items-center gap-2">
              {session?.user?.image && session?.user.name && (
                <>
                  <Avatar
                    src={session.user?.image}
                    fallback={session.user.name[0]}
                  />
                  <Text className="font-medium">{session.user.name}</Text>
                </>
              )}
            </div>
            <p className="text-ui-fg-muted mb-0.5 rounded-md px-3 py-1.5 text-xs font-medium uppercase leading-5">
              Admin Actions
            </p>
            <ul className="txt-compact-small-plus grid grid-flow-row auto-rows-max gap-0.5">
              {list.map(({ isActive, link, title }) => (
                <li key={link}>
                  <Link
                    href={link}
                    className={`group flex w-full items-center rounded-md border transition-all hover:bg-ui-bg-base-hover gap-3 px-3 py-1.5
                        ${
                          isActive
                            ? "bg-ui-bg-base-pressed text-ui-fg-base border-ui-border-base"
                            : "border-transparent text-ui-fg-subtle"
                        }`}
                  >
                    {title}
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

export default Sidebar;

const getList = (pathname: string) => {
  return [
    {
      title: "Dashboard",
      link: "/admin/dashboard",
      isActive: pathname === "/admin/dashboard",
    },
    {
      title: "Tools",
      link: "/admin/dashboard/tools",
      isActive: pathname === "/admin/dashboard/tools",
    },
    {
      title: "Tags",
      link: "/admin/dashboard/tags",
      isActive: pathname === "/admin/dashboard/tags",
    },
    {
      title: "Users",
      link: "/admin/dashboard/users",
      isActive: pathname === "/admin/dashboard/users",
    },
  ];
};
