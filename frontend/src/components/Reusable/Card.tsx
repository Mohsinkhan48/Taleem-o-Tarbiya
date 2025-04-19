import React, { ReactNode } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "", ...rest }) => {
  return (
    <div
      className={`border border-border bg-card text-text ${className}`}
      {...rest} // allows all native div props like onClick, id, style, etc.
    >
      {children}
    </div>
  );
};

export default Card;
