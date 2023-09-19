"use client";
import { Button } from "@medusajs/ui";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  ClientSafeProvider,
  LiteralUnion,
  signIn,
  useSession,
} from "next-auth/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const AuthButton = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) => {
  const { status } = useSession();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get("callbackUrl") || "/dashboard";

  useEffect(() => {
    if (status === "authenticated") {
      push(callback);
    }
  }, [status, callback, push]);

  return (
    <div>
      {status === "unauthenticated" && providers && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid gap-4"
        >
          {Object.values(providers).map((provider) => (
            <Button
              onClick={() => {
                signIn(provider.id);
              }}
              key={provider.name}
            >
              Continue with {provider.name}
            </Button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AuthButton;
