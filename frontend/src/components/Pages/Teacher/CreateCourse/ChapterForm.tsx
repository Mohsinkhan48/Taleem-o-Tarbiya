import React from 'react';
import CollapsibleCard from '../../../Reusable/CollapsibleCard';
import Input from '../../../Reusable/Input';
import Button from '../../../Reusable/Button';
import QuizForm from './QuizForm';
import AssignmentForm from './AssignmentForm';
import { Assignment, Chapter, Quiz } from '../../../../types/course.types';

interface Props {
  chapter: Chapter;
  onChange: (updated: Chapter) => void;
  onRemove: () => void;
}

const ChapterForm: React.FC<Props> = ({ chapter, onChange, onRemove }) => {
  const updateQuiz = (quiz: Quiz) => onChange({ ...chapter, quiz });
  const updateAssignment = (assignment: Assignment) => onChange({ ...chapter, assignment });

  return (
    <CollapsibleCard title={`Chapter: ${chapter.title || 'Untitled Chapter'}`}>
      <Input
        label="Chapter Title"
        value={chapter.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...chapter, title: e.target.value })}
      />
      <Input
        label="Content"
        value={chapter.content}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...chapter, content: e.target.value })}
      />
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          checked={chapter.isPreview}
          onChange={(e) => onChange({ ...chapter, isPreview: e.target.checked })}
          className="mr-2"
        />
        <label>Is Preview?</label>
      </div>

      <QuizForm quiz={chapter.quiz} onChange={updateQuiz} />
      <AssignmentForm assignment={chapter.assignment} onChange={updateAssignment} />

      <Button onClick={onRemove} variant="danger" className="mt-2">Remove Chapter</Button>
    </CollapsibleCard>
  );
};

export default ChapterForm;
