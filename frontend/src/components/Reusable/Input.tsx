import React, { forwardRef } from "react";

// Define the types for the props
interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  [key: string]: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      value,
      onChange,
      error,
      disabled = false,
      size = "md",
      className,
      ...rest
    },
    ref
  ) => {
    let inputStyles =
      "w-full bg-input-background rounded border border-input-border focus:ring-input-focus focus:outline-none focus:ring-2 transition duration-200 ";

    // Apply size styles
    if (size === "sm") {
      inputStyles += "p-1 text-sm ";
    } else if (size === "md") {
      inputStyles += "p-2 text-base ";
    } else if (size === "lg") {
      inputStyles += "p-3 text-lg ";
    }

    // Apply theme and error styles
    if (error) {
      inputStyles +=
        "border-red-400 bg-red-50 text-red-700 focus:border-red-500 focus:ring-red-200 ";
    } else if (disabled) {
      inputStyles += "opacity-50 cursor-not-allowed ";
    }

    return (
      <div className="mb-4 text-text">
        {label && (
          <label className="block mb-1 text-sm font-semibold">{label}</label>
        )}
        <input
          ref={ref}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className={inputStyles + (className || "")}
          {...rest}
        />
        {error && <p className="mt-1 text-sm text-error font-medium">{error}</p>}
      </div>
    );
  }
);

export default Input;
