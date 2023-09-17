"use client";
import useShowNavbar from "@/hooks/useShowNavbar";
import { Avatar, Button, Heading } from "@medusajs/ui";
import { signIn, useSession } from "next-auth/react";

const NavBar = () => {
  const showNaveBar = useShowNavbar();
  const { data: session, status } = useSession();

  if (showNaveBar)
    return (
      <nav>
        <div className="border-ui-border-base bg-ui-bg-base sticky top-0 z-50 w-full border-b">
          <div className="container flex items-center justify-between px-4 py-3 md:px-8 mx-auto">
            <Heading>Superflex AI</Heading>
            {status === "unauthenticated" && (
              <Button onClick={() => signIn()}>Get Started</Button>
            )}
            {status === "authenticated" &&
              session.user?.image &&
              session.user.name && (
                <Avatar
                  src={session.user?.image}
                  fallback={session.user.name[0]}
                />
              )}
          </div>
        </div>
      </nav>
    );

  return null;
};

export default NavBar;
