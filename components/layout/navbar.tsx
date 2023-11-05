"use client";
import useShowNavbar from "@/hooks/useShowNavbar";
import { Avatar, Button, Heading } from "@medusajs/ui";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
                  <Avatar
                    src={session.user?.image}
                    fallback={session.user.name[0]}
                  />
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
