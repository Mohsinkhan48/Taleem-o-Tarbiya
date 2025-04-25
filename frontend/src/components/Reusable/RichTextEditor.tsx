// src/components/RichTextEditor.tsx
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  const handleChange = (content: string) => {
    onChange(content);
  };

  return (
    <div>
      <label className="font-medium">{label}</label>
      <ReactQuill
        value={value}
        onChange={handleChange}
        placeholder={placeholder || 'Write your content here...'}
        className="bg-input-background rounded text-text mt-1"
      />
    </div>
  );
};

export default RichTextEditor;
