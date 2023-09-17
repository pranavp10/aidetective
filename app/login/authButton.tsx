"use client";
import { Button } from "@medusajs/ui";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";

const AuthButton = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) => {
  return (
    <div className="grid gap-4">
      {providers &&
        Object.values(providers).map((provider) => (
          <Button
            onClick={() => {
              signIn(provider.id);
            }}
            key={provider.name}
          >
            Continue with {provider.name}
          </Button>
        ))}
    </div>
  );
};

export default AuthButton;
