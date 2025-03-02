'use client';

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc"; // Google Icon

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Image Section - Moved to the Left */}
      <div className="relative hidden lg:block">
        <img
          src="/images/bayangida1.jpeg"
          alt="Login Background"
          className="absolute inset-0 -top-[3px] h-[1029px] w-[920px] object-cover rounded-tr-[26px] rounded-br-[26px] dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      {/* Text Section - Moved to the Right */}
      <div className="flex flex-col justify-center gap-6 p-8 md:p-16 text-[#111111]">
        {/* Heading */}
        <h1 className="font-['Cabinet_Grotesk_Variable'] font-bold text-[64px] leading-[50px]">
          Welcome to <br /> Bayangida
        </h1>

        {/* Description */}
        <p className="font-['Poppins'] font-normal text-[20px] leading-[30px]">
          Discover fresh farm produce delivered directly to your doorstep. Enjoy a seamless shopping experience and
          support local farmers.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 mt-4">
          {/* Register Button */}
          <Button
            className="w-[267px] h-[69.47px] border-[3.12px] border-[#0B7F40] text-[#0B7F40] rounded-full text-center text-[21.86px] font-medium leading-[31.23px] tracking-[1.5%]"
            variant="outline"
          >
            Register
          </Button>

          {/* Login Button */}
          <Button
            className="w-[267px] h-[69.47px] bg-[#0B7F40] text-white rounded-full text-center text-[21.86px] font-medium leading-[31.23px] tracking-[1.5%]"
          >
            Login
          </Button>
        </div>

        {/* Google Sign-In Button */}
        {/* Google Sign-In Button */}
<Button
  className="mt-6 w-[558.98px] h-[84.31px] border-[3.12px] border-[#252525] rounded-full flex items-center justify-center gap-[24.98px] px-[37.47px] py-[12.49px]"
  variant="outline"
>
  <FcGoogle style={{ width: "37.47px", height: "37.47px" }} /> Login with Google
</Button>

      </div>
    </div>
  );
}
