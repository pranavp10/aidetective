"use client";
import useShowNavbar from "@/hooks/useShowNavbar";
import { ArrowRightOnRectangle } from "@medusajs/icons";
import { Avatar, Button, Heading, DropdownMenu } from "@medusajs/ui";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const NavBar = () => {
  const showNaveBar = useShowNavbar();
  const { data: session, status } = useSession();
  const { push } = useRouter();

  if (showNaveBar)
    return (
      <nav>
        <div className="border-ui-border-base bg-ui-bg-base sticky top-0 z-50 w-full border-b">
          <div className="container flex items-center justify-between px-4 py-3 md:px-8 mx-auto">
            <Link href="/">
              <Heading>Superflex AI</Heading>
            </Link>
            {status === "unauthenticated" && (
              <Button onClick={() => signIn()}>Get Started</Button>
            )}
            {status === "authenticated" && (
              <div className="flex items-center gap-4">
                {session.user.role === "SUPER_ADMIN" && (
                  <Button onClick={() => push("/admin/dashboard")}>
                    Admin Dashboard
                  </Button>
                )}
                {session.user?.image && session.user.name && (
                  <DropdownMenu>
                    <DropdownMenu.Trigger>
                      <Avatar
                        src={session.user?.image}
                        fallback={session.user.name[0]}
                      />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                      className="flex flex-col justify-start w-fit z-50"
                      style={{ minWidth: "10px" }}
                      align="end"
                    >
                      <DropdownMenu.Item
                        className="gap-x-2"
                        onClick={() => signOut()}
                      >
                        <ArrowRightOnRectangle className="text-ui-fg-subtle" />
                        Logout
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    );

  return null;
};

export default NavBar;
