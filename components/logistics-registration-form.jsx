import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LogisticsRegistrationForm({ className, ...props }) {
  return (
    <div
      className={cn(
        "w-[570px] h-[776px] flex items-center justify-center",
        className
      )}
      {...props}
    >
      <Card className="w-full h-full rounded-[34px] shadow-lg p-8 bg-[#042E22]">
        <CardContent>
          {/* "Register" Text Inside the Card */}
          <h2
            className="text-[48px] font-bold leading-[68px] tracking-[0%] text-[#0B7F40] mb-6"
            style={{ fontFamily: "Cabinet Grotesk Variable" }}
          >
            Register
          </h2>

          {/* Scrollable Form Container */}
          <div className="h-[600px] overflow-y-auto pr-4">
            <form className="flex flex-col gap-6">
              {/* Name Input */}
              <div className="grid gap-2 w-full">
                <Label htmlFor="name" className="text-white">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  className="w-full h-[50px] rounded-[10px] border-[2px] border-[#EAEDFF] bg-white px-4 py-3 text-black"
                />
              </div>

              {/* Email Input */}
              <div className="grid gap-2 w-full">
                <Label htmlFor="email" className="text-white">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="w-full h-[50px] rounded-[10px] border-[2px] border-[#EAEDFF] bg-white px-4 py-3 text-black"
                />
              </div>

              {/* Contact Phone Input */}
              <div className="grid gap-2 w-full">
                <Label htmlFor="phone" className="text-white">
                  Contact Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  className="w-full h-[50px] rounded-[10px] border-[2px] border-[#EAEDFF] bg-white px-4 py-3 text-black"
                />
              </div>

              {/* Company Name Input (Optional) */}
              <div className="grid gap-2 w-full">
                <Label htmlFor="company" className="text-white">
                  Company Name (optional)
                </Label>
                <Input
                  id="company"
                  type="text"
                  className="w-full h-[50px] rounded-[10px] border-[2px] border-[#EAEDFF] bg-white px-4 py-3 text-black"
                />
              </div>

              {/* Company Registration Number Input */}
              <div className="grid gap-2 w-full">
                <Label htmlFor="registration" className="text-white">
                  Company Registration Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="registration"
                  type="text"
                  required
                  className="w-full h-[50px] rounded-[10px] border-[2px] border-[#EAEDFF] bg-white px-4 py-3 text-black"
                />
              </div>

              {/* Country / Region Select */}
              <div className="grid gap-2 w-full">
                <Label htmlFor="country" className="text-white">
                  Country / Region <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="w-full h-[66px] rounded-[10px] border-[2px] border-[#EAEDFF] bg-white px-4 py-3 text-black">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nigeria">Nigeria</SelectItem>
                    <SelectItem value="ghana">Ghana</SelectItem>
                    <SelectItem value="kenya">Kenya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Town / City Input */}
              <div className="grid gap-2 w-full">
                <Label htmlFor="city" className="text-white">
                  Town / City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  type="text"
                  required
                  className="w-full h-[50px] rounded-[10px] border-[2px] border-[#EAEDFF] bg-white px-4 py-3 text-black"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-4 flex justify-center w-full">
                <Button
                  type="submit"
                  className="w-full h-[44px] rounded-full bg-[#0B7F40] text-white text-center px-[14px] py-[12px] gap-2"
                >
                  Register
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}