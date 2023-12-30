import { Badge, Heading } from "@medusajs/ui";
import AuthButton from "./authButton";
import { Clock, RocketLaunch, Star, ArrowLeft } from "@medusajs/icons";
import { IconButton, Text } from "@medusajs/ui";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <div className="relative isolate bg-white overflow-y-hidden h-full">
      <div className="mx-auto h-screen">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-16 lg:py-48 flex justify-center items-center">
          <div className="lg:mx-0 lg:max-w-xl flex justify-center items-center flex-col">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10">
              <svg
                className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    x="100%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill="white" />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                />
              </svg>
            </div>

            <div className="-mx-4 mt-10 bg-white px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-3xl sm:p-24 flex justify-center items-center flex-col">
              <Link href="/" className="flex items-center gap-3 mb-6 mx-auto">
                <Image
                  src="/android-chrome-512x512.png"
                  className="rounded-full"
                  alt="logo of company"
                  width={35}
                  height={35}
                />
                <Heading>AI Detective</Heading>
              </Link>
              <h2 className="text-center text-3xl font-medium tracking-tight text-gray-900">
                Lets get started
              </h2>
              <Text className="text-ui-fg-muted  text-center mt-1 mb-6">
                Signup with the AI Detective
              </Text>
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
