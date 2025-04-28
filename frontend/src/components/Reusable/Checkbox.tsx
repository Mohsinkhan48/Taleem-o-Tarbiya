// components/Checkbox.tsx
import React from "react";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa"; // You can change icons if you want

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  labelSize?: string; // eg: "text-sm", "text-lg"
  iconSize?: number;  // icon size in px
  [key: string]: any;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  disabled = false,
  error,
  className = "",
  labelSize = "text-base",
  iconSize = 20,
  ...rest
}) => {
  return (
    <div className="text-text mb-4">
      <label className={`inline-flex items-center gap-3 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
        {/* Hidden native checkbox */}
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...rest}
        />

        {/* Custom Icon Toggle */}
        <div className={`transition-transform duration-200`}>
          {checked ? (
            <FaCheckSquare size={iconSize} className="text-primary" />
          ) : (
            <FaRegSquare size={iconSize} className="text-gray-400" />
          )}
        </div>

        {/* Label */}
        {label && (
          <span className={`${labelSize} select-none`}>
            {label}
          </span>
        )}
      </label>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-error font-medium">{error}</p>
      )}
    </div>
  );
};

export default Checkbox;
