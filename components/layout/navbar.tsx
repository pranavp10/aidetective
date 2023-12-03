"use client";
import useShowNavbar from "@/hooks/useShowNavbar";
import { Avatar, Button, Heading, DropdownMenu } from "@medusajs/ui";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

const NavBar = () => {
  const showNaveBar = useShowNavbar();
  const { data: session, status } = useSession();
  const { push } = useRouter();

  if (showNaveBar)
    return (
      <nav className="">
        <div className=" flex items-center justify-between">
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
            <div className="flex items-center">
              <Button
                onClick={() =>
                  signIn("google", { callbackUrl: "/user/tool/submit-tool" })
                }
                variant="transparent"
              >
                Submit
              </Button>
              <Button onClick={() => signIn("google")} variant="transparent">
                Login
              </Button>
            </div>
          )}
          {status === "authenticated" && (
            <div className="flex items-center gap-3">
              <Button
                onClick={() => push("/user/tool/submit-tool")}
                variant="transparent"
              >
                Submit
              </Button>
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
                    {session.user.role === "SUPER_ADMIN" && (
                      <DropdownMenu.Item
                        className="gap-x-2 cursor-pointer"
                        onClick={() => push("/admin/dashboard")}
                      >
                        Super Admin
                      </DropdownMenu.Item>
                    )}
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
      </nav>
    );

  return null;
};

export default NavBar;
