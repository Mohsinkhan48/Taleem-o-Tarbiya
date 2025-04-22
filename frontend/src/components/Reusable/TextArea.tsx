// components/TextArea.tsx
import React, { forwardRef } from "react";

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  rows?: number;
  [key: string]: any;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      error,
      disabled = false,
      size = "md",
      className,
      rows = 4,
      ...rest
    },
    ref
  ) => {
    let textareaStyles =
      "w-full bg-input-background rounded border border-input-border focus:ring-input-focus focus:outline-none focus:ring-2 transition duration-200 ";

    if (size === "sm") textareaStyles += "p-1 text-sm ";
    else if (size === "md") textareaStyles += "p-2 text-base ";
    else if (size === "lg") textareaStyles += "p-3 text-lg ";

    if (error) {
      textareaStyles +=
        "border-red-400 bg-red-50 text-red-700 focus:border-red-500 focus:ring-red-200 ";
    } else if (disabled) {
      textareaStyles += "opacity-50 cursor-not-allowed ";
    }

    return (
      <div className="mb-4 text-text">
        {label && (
          <label className="block mb-1 text-sm font-semibold">{label}</label>
        )}
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={textareaStyles + (className || "")}
          {...rest}
        />
        {error && <p className="mt-1 text-sm text-error font-medium">{error}</p>}
      </div>
    );
  }
);

export default TextArea;
