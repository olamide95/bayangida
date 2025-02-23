'use client';

import { VerifyCodeForm } from "@/components/verify";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Image Section - Moved to the Left */}
      <div className="relative hidden lg:block">
        <img
          src="/images/main3.jpeg"
          alt="Login Background"
          className="absolute inset-0 -top-[3px] h-[1029px] w-[720px] object-cover rounded-tr-[26px] rounded-br-[26px] dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      {/* Login Form Section - Moved to the Right */}
      <div className="flex flex-col gap-[2px] p-2 md:p-1">
        {/* Styled "Login" Text - Left Aligned */}
        <h2 
          className="text-[48px] font-bold leading-[68px] tracking-[0%] text-[#111111] mb-200.5"
          style={{ fontFamily: "Cabinet Grotesk Variable" }}
        >
          Login
        </h2>

        {/* Centered Login Form */}
        <div className="flex flex-1 items-center justify-center">
          
          <div className="w-full max-w-xs">
            
            <VerifyCodeForm />
          </div>
        </div>
      </div>
    </div>
  );
}
