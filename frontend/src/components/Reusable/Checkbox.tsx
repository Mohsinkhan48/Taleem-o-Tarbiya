// components/Checkbox.tsx
import React from "react";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  [key: string]: any;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  error,
  className,
  ...rest
}) => {
  return (
    <div className="mb-4 text-text">
      <label className="inline-flex items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`form-checkbox text-input-focus focus:ring-input-focus focus:ring-2 transition duration-200 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${className || ""}`}
          {...rest}
        />
        {label && <span className="text-sm">{label}</span>}
      </label>
      {error && <p className="mt-1 text-sm text-error font-medium">{error}</p>}
    </div>
  );
};

export default Checkbox;
