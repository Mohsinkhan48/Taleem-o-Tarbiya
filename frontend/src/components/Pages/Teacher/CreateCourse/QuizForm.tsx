import React from 'react';
import Input from '../../../Reusable/Input';
import Button from '../../../Reusable/Button';
import CollapsibleCard from '../../../Reusable/CollapsibleCard';
import { Quiz } from '../../../../types/course.types';
import Card from '../../../Reusable/Card';

interface Props {
  quiz?: Quiz;
  onChange: (quiz: Quiz) => void;
}

const QuizForm: React.FC<Props> = ({ quiz = { title: '', questions: [] }, onChange }) => {
  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...quiz.questions];
    (updatedQuestions[index] as any)[field] = value;
    onChange({ ...quiz, questions: updatedQuestions });
  };

  const updateOption = (index: number, optIndex: number, value: string) => {
    const updatedQuestions = [...quiz.questions];
    const options = [...updatedQuestions[index].options];
    options[optIndex] = value;
    updatedQuestions[index].options = options;
    onChange({ ...quiz, questions: updatedQuestions });
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
    <CollapsibleCard title="Quiz">
      <Input
        label="Quiz Title"
        value={quiz.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...quiz, title: e.target.value })}
      />

      {quiz.questions.map((q, index) => (
        <Card className="p-4 rounded-md space-y-4" key={index}>
          <Input
            label="Question"
            value={q.question}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuestion(index, 'question', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            {q.options.map((option, i) => (
              <Input
                key={i}
                label={`Option ${i + 1}`}
                value={option}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateOption(index, i, e.target.value)}
              />
            ))}
          </div>
          <Input
            label="Correct Answer"
            value={q.correctAnswer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuestion(index, 'correctAnswer', e.target.value)}
          />
          <Button onClick={() => removeQuestion(index)} variant="danger">
            Remove Question
          </Button>
        </Card>
      ))}

      <Button onClick={addQuestion} variant="secondary">+ Add Question</Button>
    </CollapsibleCard>
  );
};

export default QuizForm;
