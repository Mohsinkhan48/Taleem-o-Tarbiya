import React, { useState } from "react";

interface FlexibleImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
  rounded?: boolean;
  border?: boolean;
  fallbackSrc?: string; // allow custom fallback if needed
}

const ImageContainer: React.FC<FlexibleImageProps> = ({
  src,
  alt,
  width = "w-32",
  height = "h-32",
  className = "",
  rounded = true,
  border = true,
  fallbackSrc = "/src/assets/placeholder.png",
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  const classes = [
    width,
    height,
    "object-contain",
    "flex",
    "items-center",
    "justify-center",
    rounded ? "rounded-md" : "",
    border ? "border border-card-border" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={classes}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default ImageContainer;
