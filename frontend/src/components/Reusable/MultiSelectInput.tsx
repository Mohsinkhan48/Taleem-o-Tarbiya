// components/MultiSelectInput.tsx
import React, { useState, useRef, useEffect } from "react";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectInputProps {
  label?: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  label,
  options,
  selectedValues,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleValue = (value: string) => {
    const exists = selectedValues.includes(value);
    const updated = exists
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(updated);
  };

  const displaySelected = () => {
    const selectedLabels = options
      .filter((opt) => selectedValues.includes(opt.value))
      .map((opt) => opt.label);

    const topThree = selectedLabels.slice(0, 3);
    const remaining = selectedLabels.length - 3;

    return (
      <div className="flex flex-wrap gap-1">
        {topThree.map((label, idx) => (
          <span key={idx} className="bg-card text-text px-2 py-1 rounded-full text-xs font-medium">
            {label}
          </span>
        ))}
        {remaining > 0 && (
          <span className="bg-card px-2 py-1 rounded-full text-xs text-secondary font-medium">
            +{remaining} more
          </span>
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-4 relative" ref={containerRef}>
      {label && (
        <label className="block mb-1 text-sm font-semibold text-text">
          {label}
        </label>
      )}

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full p-2 cursor-pointer text-md flex justify-between items-center bg-input-background rounded border border-input-border focus:ring-input-focus focus:outline-none focus:ring-2 transition duration-200"
      >
        <span className="truncate w-full">
          {selectedValues.length ? displaySelected() : "Select tags..."}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full bg-background border border-card-border rounded mt-1 max-h-60 overflow-auto text-text">
          {options.map((opt) => {
            const checked = selectedValues.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex items-center px-3 py-2 cursor-pointer"
              >
                <div
                  onClick={() => toggleValue(opt.value)}
                  className="mr-2"
                >
                  {checked ? (
                    <FaCheckSquare size={18} className="text-primary" />
                  ) : (
                    <FaRegSquare size={18} className="text-gray-400" />
                  )}
                </div>
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelectInput;
