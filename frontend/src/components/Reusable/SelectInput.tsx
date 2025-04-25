// components/SelectInput.tsx
import React, { forwardRef } from "react";

interface SelectInputProps {
  label?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  options: { label: string; value: string | number }[];
  [key: string]: any;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    {
      label,
      value,
      onChange,
      error,
      disabled = false,
      size = "md",
      className,
      options,
      ...rest
    },
    ref
  ) => {
    let selectStyles =
      "w-full cursor-pointer bg-input-background rounded border border-input-border focus:ring-input-focus focus:outline-none focus:ring-2 transition duration-200 ";

    if (size === "sm") selectStyles += "p-1 text-sm ";
    else if (size === "md") selectStyles += "p-2 text-base ";
    else if (size === "lg") selectStyles += "p-3 text-lg ";

    if (error) {
      selectStyles +=
        "border-red-400 bg-red-50 text-red-700 focus:border-red-500 focus:ring-red-200 ";
    } else if (disabled) {
      selectStyles += "opacity-50 cursor-not-allowed ";
    }

    return (
      <div className="mb-4 text-text">
        {label && (
          <label className="block mb-1 text-sm font-semibold">{label}</label>
        )}
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={selectStyles + (className || "")}
          {...rest}
        >
          <option value="" disabled>Select...</option>
          {options.map((opt: { label: string; value: string | number }) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-error font-medium">{error}</p>}
      </div>
    );
  }
);

export default SelectInput;
