import React, { forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
      className = "",
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    let inputStyles =
      "w-full bg-input-background rounded border border-input-border focus:ring-input-focus focus:outline-none focus:ring-2 transition duration-200 pr-10 ";

    if (size === "sm") inputStyles += "p-1 text-sm ";
    else if (size === "md") inputStyles += "p-2 text-base ";
    else if (size === "lg") inputStyles += "p-3 text-lg ";

    if (error) {
      inputStyles +=
        "border-error bg-red-50 text-error focus:border-error focus:ring-error ";
    } else if (disabled) {
      inputStyles += "opacity-50 cursor-not-allowed ";
    }

    return (
      <div className="mb-4 text-text relative">
        {label && (
          <label className="block mb-1 text-sm font-semibold">{label}</label>
        )}
        <input
          ref={ref}
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          className={inputStyles + className}
          {...rest}
        />
        {/* Password Eye Icon */}
        {isPassword && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-primary transition-transform duration-200 active:scale-90"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
        {error && (
          <p className="mt-1 text-sm text-error font-medium">{error}</p>
        )}
      </div>
    );
  }
);

export default Input;
