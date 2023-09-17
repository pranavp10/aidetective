"use client";
import useShowNavbar from "@/hooks/useShowNavbar";
import { CubeSolid } from "@medusajs/icons";
import { Button, Heading } from "@medusajs/ui";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const showNaveBar = useShowNavbar();
  const { push } = useRouter();
  const { data: session } = useSession();
  if (showNaveBar)
    return (
      <nav>
        <div className="border-ui-border-base bg-ui-bg-base sticky top-0 z-50 w-full border-b">
          <div className="container flex items-center justify-between px-4 py-3 md:px-8 mx-auto">
            <Heading>Superflex AI</Heading>
            <Button onClick={() => push("/login")}>Get Started</Button>
          </div>
        </div>
      </nav>
    );

  return null;
};

export default NavBar;
