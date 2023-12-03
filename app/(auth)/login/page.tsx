import { Heading } from "@medusajs/ui";
import AuthButton from "./authButton";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex justify-center items-center h-full w-1/3">
        <AuthButton />
      </div>
      <div className="flex-1 w-full flex justify-center items-center h-full ">
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
      </div>
    </div>
  );
};

export default Login;
