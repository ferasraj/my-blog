import { SignIn } from "@clerk/clerk-react";
import { twMerge } from "tailwind-merge";

const LoginPage = () => {
  return (
    <div
      className={twMerge("flex items-center justify-center h-[calc(100vh)]")}
    >
      <SignIn signUpUrl="/register" />
    </div>
  );
};

export default LoginPage;
