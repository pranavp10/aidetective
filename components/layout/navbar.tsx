"use client";
import useShowNavbar from "@/hooks/useShowNavbar";
import { Avatar, Button, Heading, DropdownMenu } from "@medusajs/ui";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Google } from "@medusajs/icons";

const NavBar = () => {
  const showNaveBar = useShowNavbar();
  const { data: session, status } = useSession();
  const { push } = useRouter();

  if (showNaveBar)
    return (
      <nav className="mb-14">
        <div className="border-ui-border-base bg-ui-bg-base fixed top-0 z-50 w-full border-b">
          <div className="container flex items-center justify-between px-4 py-3 md:px-8 mx-auto">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/android-chrome-512x512.png"
                className="rounded-full"
                alt="logo of company"
                width={30}
                height={30}
              />
              <Heading>AI Detective</Heading>
            </Link>
            {status === "unauthenticated" && (
              <Button onClick={() => signIn("google")} variant="secondary">
                <Google />
                Continue with Google
              </Button>
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
                        className="gap-x-2 cursor-pointer"
                        onClick={() => push("/dashboard")}
                      >
                        Dashboard
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        className="gap-x-2 text-ui-fg-error cursor-pointer"
                        onClick={() => signOut()}
                      >
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
