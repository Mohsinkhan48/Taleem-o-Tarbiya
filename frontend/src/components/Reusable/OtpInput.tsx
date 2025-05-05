import React, { useState, useRef } from "react";
import Button from "../Reusable/Button";
import Input from "../Reusable/Input";
import AuthLayout from "../Pages/Auth/AuthPageLayout";

export default function OtpInput({
  onSubmit,
  isLoading,
}: {
  onSubmit: (otp: string) => {};
  isLoading: boolean;
}) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value: string = e.target.value;
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    const newOtp: string[] = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(otp.join(""));
  };

  return (
    <AuthLayout title="Verify OTP">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex space-x-2 mb-4">
          {otp.map((_, index) => (
            <Input
              key={index}
              type="text"
              value={otp[index]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(index, e)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(index, e)
              }
              maxLength={1}
              ref={(el: HTMLInputElement | null) =>
                (inputRefs.current[index] = el)
              }
              className="text-center text-xl"
            />
          ))}
        </div>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          Verify OTP
        </Button>
      </form>
    </AuthLayout>
  );
}
