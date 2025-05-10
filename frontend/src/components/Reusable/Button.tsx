import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader } from "../../assets/Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "link";
  rounded?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  rounded,
  isLoading,
  disabled,
  size = "md",
  className = "",
  ...rest
}) => {
  let buttonClasses = `flex items-center border rounded-md text-button-text`;

  // Size styles
  switch (size) {
    case "sm":
      buttonClasses += " text-sm px-2 py-1";
      break;
    case "lg":
      buttonClasses += " text-lg px-5 py-3";
      break;
    case "md":
    default:
      buttonClasses += " text-base px-3 py-1.5";
  }

  // Variant styles
  if (variant === "primary")
    buttonClasses +=
      " border-button-border-primary bg-button-primary hover:bg-button-hover-primary";
  if (variant === "secondary")
    buttonClasses +=
      " border-button-border-secondary bg-button-secondary hover:bg-button-hover-secondary";
  if (variant === "success") buttonClasses += " border-green-500 bg-green-500 ";
  if (variant === "warning") buttonClasses += " border-yellow-400 bg-yellow-400 ";
  if (variant === "danger") buttonClasses += " border-red-500 bg-red-500 ";
  if (variant === "link")
    buttonClasses += " border-none bg-transparent text-link underline";

  if (disabled || isLoading) {
    buttonClasses += " opacity-50 cursor-not-allowed";
  }

  if (rounded) buttonClasses += " rounded-full";
  if (className) buttonClasses += ` ${className}`;

  return (
    <button
      {...rest}
      className={buttonClasses.trim()}
      disabled={isLoading || disabled}
    >
      {isLoading ? <Loader size={24} /> : children}
    </button>
  );
};

export default Button;
