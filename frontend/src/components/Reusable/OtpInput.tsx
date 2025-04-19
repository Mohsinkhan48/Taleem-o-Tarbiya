import React, { useState, useRef } from "react";
import Card from "../Reusable/Card";
import Button from "../Reusable/Button";
import Input from "../Reusable/Input";

export default function OtpInput({
  onSubmit,
  isLoading
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
    <div className="flex items-center justify-center m-12">
      <Card
        className="rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4
      p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="text-xl mb-4">Verify OTP</div>
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
      </Card>
    </div>
  );
}
