import React from 'react';
import CollapsibleCard from '../../../Reusable/CollapsibleCard';
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
        { title: '', content: '', isPreview: false },
      ],
    });
  };

  const removeChapter = (index: number) => {
    const updated = [...module.chapters];
    updated.splice(index, 1);
    onChange({ ...module, chapters: updated });
  };

  return (
    <CollapsibleCard title={`Module: ${module.title || 'Untitled Module'}`}>
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

      <div className="flex items-center gap-2">
        <Button onClick={addChapter} variant="secondary">+ Add Chapter</Button>
        <Button onClick={onRemove} variant="danger">Remove Module</Button>
      </div>
    </CollapsibleCard>
  );
};

export default ModuleForm;
