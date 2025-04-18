// components/ModuleForm.tsx
import React from 'react';
import Card from '../../../Reusable/Card';
import Input from '../../../Reusable/Input';
import Button from '../../../Reusable/Button';
import ChapterForm from './ChapterForm';
import { Chapter, Module } from '../../../../types/course.types';

interface Props {
  module: Module;
  onChange: (updated: Module) => void;
  onRemove: () => void;
}

const ModuleForm: React.FC<Props> = ({ module, onChange, onRemove }) => {
  const updateChapter = (index: number, chapter: Chapter) => {
    const updated = [...module.chapters];
    updated[index] = chapter;
    onChange({ ...module, chapters: updated });
  };

  const addChapter = () => {
    onChange({
      ...module,
      chapters: [
        ...module.chapters,
        { title: '', content: '', videoUrl: '', isPreview: false },
      ],
    });
  };

  const removeChapter = (index: number) => {
    const updated = [...module.chapters];
    updated.splice(index, 1);
    onChange({ ...module, chapters: updated });
  };

  return (
    <Card className="mb-4">
      <Input
        label="Module Title"
        value={module.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...module, title: e.target.value })}
      />

      {module.chapters.map((chapter, index) => (
        <ChapterForm
          key={index}
          chapter={chapter}
          onChange={(updated) => updateChapter(index, updated)}
          onRemove={() => removeChapter(index)}
        />
      ))}

      <Card className="flex items-center gap-2 mt-2">
        <Button onClick={addChapter} variant="secondary">+ Add Chapter</Button>
        <Button onClick={onRemove} variant="danger">Remove Module</Button>
      </Card>
    </Card>
  );
};

export default ModuleForm;
