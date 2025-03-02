import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function VerifyCodeForm({ className, ...props }) {
  const [code, setCode] = useState(["", "", "", "", ""]);

  // Handle input change
  const handleChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div
      className={cn(
        "w-[570px] h-[776px] flex items-center justify-center",
        className
      )}
      {...props}
    >
      <Card className="w-full h-full rounded-[34px] shadow-lg p-8 bg-[#042E22]">
        <CardContent className="flex flex-col items-center">
          {/* Verify Your Code Header */}
          <h2
            className="text-[48px] font-bold leading-[68px] tracking-[0%] text-[#0B7F40] mb-6"
            style={{ fontFamily: "Cabinet Grotesk Variable" }}
          >
             Verify Your Code
          </h2>
         
          {/* Subtext */}
          <p
            className="text-white text-center mt-2"
            style={{
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "26px",
              letterSpacing: "0%",
            }}
          >
            Enter the passcode you just received on your email address ending
            with ********in@gmail.com
          </p>

          {/* Verification Code Inputs */}
          <div className="flex justify-center gap-4 mt-6">
            {code.map((digit, index) => (
              <Input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="text-center text-2xl text-white bg-transparent"
                style={{
                  width: "72.1px",
                  height: "80px",
                  borderRadius: "4px",
                  borderWidth: "1px",
                  borderColor: "#0B7F40",
                }}
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            type="submit"
            className="mt-6 w-[358px] h-[44px] rounded-full bg-[#0B7F40] text-white text-center px-[14px] py-[12px] gap-2"
          >
            Verify
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
