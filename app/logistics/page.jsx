import { LogisticsRegistrationForm } from "@/components/logistics-registration-form";

export default function LogisticsLoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Image Section - Left Side */}
      <div className="relative hidden lg:block">
        <img
          src="/images/logistics.jpeg"
          alt="Login Background"
          className="absolute inset-0 -top-[3px] h-[1029px] w-[920px] object-cover rounded-tr-[26px] rounded-br-[26px] dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      {/* Registration Form Section - Right Side */}
      <div className="flex flex-col gap-[2px] p-2 md:p-1">
        {/* Styled "Register" Text */}
       

        {/* Centered Registration Form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[570px]">
            <LogisticsRegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}