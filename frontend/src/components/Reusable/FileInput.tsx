// src/components/shared/FileInput.tsx
interface FileInputProps {
  label: string;
  onChange: (file: File | null) => void;
  required?: boolean;
}

const FileInput = ({ label, onChange, required = false }: FileInputProps) => {
  return (
    <div>
      <label className="block mb-1 text-sm text-text">{label}</label>
      <input
        type="file"
        accept="video/*"
        required={required}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        className="w-full px-3 py-2 bg-input-background border border-input-border rounded focus:outline-none focus:ring-2 focus:ring-input-focus text-text"
      />
    </div>
  );
};

export default FileInput;
