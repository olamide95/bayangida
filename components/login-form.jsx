import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc"; // Google Icon

export function LoginForm({ className, ...props }) {
  return (
    <div
      className={cn(
        "absolute top-[245px] left-[799px] w-[529px] h-[580px] flex items-center justify-center",
        className
      )}
      {...props}
    >
      <Card className="w-full h-full rounded-[34px] shadow-lg p-8 bg-[#042E22]">
        <CardContent>
          <form className="flex flex-col gap-6 items-center"> {/* Center the form content */}
            {/* Email Input */}
            <div className="grid gap-2 w-full max-w-[358px]">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                className="w-[358px] h-[46px] rounded-[8px] border-[1.5px] border-white bg-white px-4 py-3 text-black"
              />
            </div>

            {/* Password Input */}
            <div className="grid gap-2 w-full max-w-[358px]">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                className="w-[358px] h-[46px] rounded-[8px] border-[1.5px] border-white bg-white px-4 py-3 text-black"
              />
              <a href="#" className="text-sm text-blue-400 hover:underline self-end">
                Forgot your password?
              </a>
            </div>

            {/* Extra Space Before Login Button */}
            <div className="mt-4 flex justify-center w-full">
              <Button
                type="submit"
                className="w-[358px] h-[44px] rounded-full bg-[#0B7F40] text-white text-center px-[14px] py-[12px] gap-2"
              >
                Login
              </Button>
            </div>

            {/* OR Text Before Google Button */}
            <div className="text-white text-center font-[Montserrat] text-[14px] font-normal leading-[22px] tracking-[1%]">
              Or login with Google
            </div>

            {/* Google Login Button */}
            <div className="flex justify-center w-full">
              <Button
                variant="outline"
                className="w-[358px] h-[54px] border-2 border-white rounded-full bg-transparent flex items-center justify-center gap-4 text-white text-base font-medium"
              >
                <FcGoogle size={24} /> Login with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
