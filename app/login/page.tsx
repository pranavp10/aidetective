"use client";

import { Button, Heading } from "@medusajs/ui";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-centerv">
      <div className="flex justify-center items-center h-full w-1/3 bg-ui-bg-overlay">
        <Button onClick={() => signIn()}>Continue with Github</Button>
      </div>
      <div className="flex-1 w-full flex justify-center items-center h-full">
        <Heading>Superflex AI</Heading>
      </div>
    </div>
  );
};

export default Login;
