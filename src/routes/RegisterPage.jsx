import { SignUp } from "@clerk/clerk-react";
import { twMerge } from "tailwind-merge";

const RegisterPage = () => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center h-[calc(100vh+80px)] "
      )}
    >
      <SignUp signInUrl="/login" />
    </div>
  );
};

export default RegisterPage;
