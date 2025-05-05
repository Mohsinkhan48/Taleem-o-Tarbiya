// components/QuizForm.tsx
import React from 'react';
import Input from '../../../../Reusable/Input';
import Button from '../../../../Reusable/Button';
import Card from '../../../../Reusable/Card';
import { Quiz } from '../../../../../types/course.types';

interface Props {
  quiz?: Quiz;
  onChange: (quiz: Quiz) => void;
}

const QuizForm: React.FC<Props> = ({ quiz = { title: '', questions: [] }, onChange }) => {
  const updateQuestion = (index: number, field: string, value: string) => {
    const updated = [...quiz.questions];
    (updated[index] as any)[field] = value;
    onChange({ ...quiz, questions: updated });
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...quiz.questions];
    updated[qIndex].options[optIndex] = value;
    onChange({ ...quiz, questions: updated });
  };

  const addQuestion = () => {
    onChange({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
      ],
    });
  };

  const removeQuestion = (index: number) => {
    const updated = [...quiz.questions];
    updated.splice(index, 1);
    onChange({ ...quiz, questions: updated });
  };

  return (
    <div className="space-y-4">
      <Input
        label="Quiz Title"
        value={quiz.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...quiz, title: e.target.value })}
      />

      {quiz.questions.map((q, qIndex) => (
        <Card className="p-4 rounded-lg space-y-2" key={qIndex}>
          <Input
            label="Question"
            value={q.question}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuestion(qIndex, 'question', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt, optIndex) => (
              <Input
                key={optIndex}
                label={`Option ${optIndex + 1}`}
                value={opt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateOption(qIndex, optIndex, e.target.value)}
              />
            ))}
          </div>
          <Input
            label="Correct Answer"
            value={q.correctAnswer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
          />
          <Button onClick={() => removeQuestion(qIndex)} variant="danger">Remove Question</Button>
        </Card>
      ))}

      <Button onClick={addQuestion} variant="secondary">+ Add Question</Button>
    </div>
  );
};

export default QuizForm;
