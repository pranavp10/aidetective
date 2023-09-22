"use client";
import { Badge, Text } from "@medusajs/ui";
import { apiData } from "../data";
import { useParams, usePathname } from "next/navigation";

export const APISideBar = () => {
  const path = usePathname();
  return (
    <div className="border-ui-border-base w-sidebar relative hidden h-full border-r lg:block">
      <div className="sticky inset-x-0 bottom-0 top-[56px] h-screen max-h-[calc(100vh-56px)] w-full">
        <div className="h-full w-full overflow-hidden">
          <div className="h-full w-full overflow-y-auto">
            <div className="h-full w-full p-6">
              {apiData.map((api) => (
                <div key={api.title} className="pb-6">
                  <Text className="text-ui-fg-muted mb-0.5 rounded-md px-3 py-1.5 text-xs font-medium uppercase leading-5">
                    {api.title}
                  </Text>
                  <div>
                    {api.details.map((details) => (
                      <ul
                        className="txt-compact-small-plus grid grid-flow-row auto-rows-max gap-0.5"
                        key={details.actions.title}
                      >
                        <li>
                          <a
                            href={details.actions.href}
                            className={`group flex w-full items-center rounded-md border transition-all hover:bg-ui-bg-base-hover gap-3 px-3 py-1.5
                        ${
                          false
                            ? "bg-ui-bg-base-pressed text-ui-fg-base border-ui-border-base"
                            : "border-transparent text-ui-fg-subtle"
                        }`}
                          >
                            <Badge color="green" size="small">
                              {details.actions.method}
                            </Badge>
                            <Text>{details.actions.title}</Text>
                          </a>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
