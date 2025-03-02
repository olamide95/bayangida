import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Label } from "@/components/ui/label";
 
export function CreateAccountForm({ className, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={cn(
      "w-[570px] h-[776px] flex items-center justify-center",
      className
    )}
    {...props}
  >
    <Card className="w-full h-full rounded-[34px] shadow-lg p-8 bg-[#042E22]">
        <CardContent className="flex flex-col items-center gap-4">
        <h2
            className="text-[48px] font-bold leading-[68px] tracking-[0%] text-[#0B7F40] mb-6"
            style={{ fontFamily: "Cabinet Grotesk Variable" }}
          >
            Create account
          </h2>
          {/* First Name & Last Name */}
          <div className="flex gap-5 w-full ">
            <div className="flex flex-col">
              <Label htmlFor="first-name" className="text-white mb-1">First Name</Label>
              <Input id="first-name" type="text" placeholder="First Name" className="text-black w-[173px] h-[46px] border-[#0B7F40] bg-white rounded-md px-4" />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="last-name" className="text-white mb-1">Last Name</Label>
              <Input id="last-name" type="text" placeholder="Last Name" className="text-black w-[173px] h-[46px] border-[#0B7F40] bg-white rounded-md px-4" />
            </div>
          </div>

          {/* Email Field - Label Aligned */}
          <div className="flex flex-col w-full mt-2">
            <Label htmlFor="email" className="text-white mb-1 pl-[4px]">Email</Label>
            <Input id="email" type="email" placeholder="Email" className="text-black w-full h-[46px] border-[#0B7F40] bg-white rounded-md px-4" />
          </div>

          {/* Password Field - Label Aligned */}
          <div className="flex flex-col w-full mt-2 relative">
            <Label htmlFor="password" className="text-white mb-1 pl-[4px]">Password</Label>
            <div className="relative w-full">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="Password" className="text-black w-full h-[46px] border-[#0B7F40] bg-white rounded-md px-4 pr-10" />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          {/* Password Requirements */}
          <p className="text-white text-sm mt-1 pl-[4px] w-full">Must contain a special character and symbol.</p>

          {/* Confirm Password Field - Label Aligned */}
          <div className="flex flex-col w-full mt-2 relative">
            <Label htmlFor="confirm-password" className="text-white mb-1 pl-[4px]">Confirm Password</Label>
            <div className="relative w-full">
              <Input id="confirm-password" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className="text-black w-full h-[46px] border-[#0B7F40] bg-white rounded-md px-4 pr-10" />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          {/* Create Account Button */}
          <Button type="submit" className="mt-6 w-full h-[44px] rounded-full bg-[#0B7F40] text-white text-center px-4 py-2">
            Create Account
          </Button>

          {/* Terms and Privacy Policy */}
          <p className="text-white text-center mt-4 text-sm w-full">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-400 underline">Terms of Service</a> and{" "}
            <a href="#" className="text-blue-400 underline">Privacy Policy</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
