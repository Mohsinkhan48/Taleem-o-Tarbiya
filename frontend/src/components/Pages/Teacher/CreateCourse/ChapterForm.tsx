// components/ChapterForm.tsx
import React from 'react';
import Card from '../../../Reusable/Card';
import Input from '../../../Reusable/Input';
import Button from '../../../Reusable/Button';
import QuizForm from './QuizForm';
import AssignmentForm from './AssignmentForm';

interface Chapter {
  title: string;
  content: string;
  videoUrl: string;
  isPreview: boolean;
  resources?: Resource[];
  quiz?: Quiz;
  assignment?: Assignment;
}

interface Resource {
  name: string;
  url: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Assignment {
  title: string;
  description: string;
  dueDate: string;
  submissionType: string;
}

interface Props {
  chapter: Chapter;
  onChange: (updated: Chapter) => void;
  onRemove: () => void;
}

const ChapterForm: React.FC<Props> = ({ chapter, onChange, onRemove }) => {
  const updateQuiz = (quiz: Quiz) => onChange({ ...chapter, quiz });
  const updateAssignment = (assignment: Assignment) => onChange({ ...chapter, assignment });

  return (
    <Card className="mb-3">
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
      <Input
        label="Video URL"
        value={chapter.videoUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...chapter, videoUrl: e.target.value })}
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
    </Card>
  );
};

export default ChapterForm;
