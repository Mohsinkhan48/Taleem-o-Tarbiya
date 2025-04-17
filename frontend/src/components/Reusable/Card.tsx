import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`border border-border rounded-lg p-4 bg-card shadow-sm text-text ${className}`}>
      {children}
    </div>
  );
};

export default Card;
