import { Heading } from "@medusajs/ui";
import { getProviders } from "next-auth/react";
import AuthButton from "./authButton";

const Login = async () => {
  const providers = await getProviders();

  return (
    <div className="h-screen flex items-center justify-centerv">
      <div className="flex justify-center items-center h-full w-1/3 bg-ui-bg-overlay">
        <AuthButton providers={providers} />
      </div>
      <div className="flex-1 w-full flex justify-center items-center h-full">
        <Heading>Superflex AI</Heading>
      </div>
    </div>
  );
};

export default Login;
