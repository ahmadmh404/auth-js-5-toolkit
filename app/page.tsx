import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Page = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-sky-500 to-blue-700">
      <div className="space-y-5 text-center">
        <h1
          className={cn(
            "text-5xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔏 Auth
        </h1>
        <p className="text-white text-lg">Simple authentication service</p>

        <div>
          <LoginButton mode="redirect" isChild>
            <Button variant={"secondary"} size={"lg"}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </div>
  );
};

export default Page;
