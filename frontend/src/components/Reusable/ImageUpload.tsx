// src/components/Reusable/ImageUpload.tsx
import React, { useRef, useState, useEffect } from "react";
import { ImCross } from "react-icons/im";

interface ImageUploadProps {
  label?: string;
  name: string;
  value?: File | string;
  onChange: (file: File | undefined) => void;
  className?: string;
  accept?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label = "Upload Image",
  name,
  value,
  onChange,
  className = "",
  accept = "image/*",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    typeof value === "string" ? value : null
  );

  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange(undefined); // clears the image in parent
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="font-medium">{label}</label>}
      <div
        className="relative bg-background border border-dashed border-card-border p-4 rounded-lg cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="h-full object-cover rounded-md w-full"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-background rounded-full p-2 shadow hover:bg-card border border-card-border"
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering file input
                handleRemoveImage();
              }}
            >
              <ImCross size={14} className="text-error" />
            </button>
          </>
        ) : (
          <div className="text-text text-center">Click to upload image</div>
        )}
      </div>
      <input
        type="file"
        name={name}
        accept={accept}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
