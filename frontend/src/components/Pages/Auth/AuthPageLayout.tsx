import React, { useEffect, useState } from "react";
import images from "../../../utils/images";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  // State to manage the animation triggers
  const [animate, setAnimate] = useState(false);

  // Trigger animations after component mounts
  useEffect(() => {
    setAnimate(true);
  }, [children, title]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div
        className={`w-full max-w-5xl bg-card border border-card-border shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 transform transition-all duration-1000 ${
          animate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`}
      >
        {/* Image Section */}
        <div className="hidden md:block transform transition-all duration-1000 opacity-0 md:opacity-100 animate-fade-in-left">
          <img
            src={images.Login_islamic}
            alt="Login visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div
          className={`flex flex-col justify-center p-8 transform transition-all duration-1000 ${
            animate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-text">{title}</h2>
            {subtitle && (
              <p className="text-sm text-secondary mt-2">{subtitle}</p>
            )}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
