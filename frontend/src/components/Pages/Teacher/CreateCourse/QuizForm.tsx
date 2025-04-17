// components/QuizForm.tsx
import React from 'react';
import Input from '../../../Reusable/Input';
import Button from '../../../Reusable/Button';
import Card from '../../../Reusable/Card';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

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
    <Card className="mt-4 border-t pt-4">
      <h4 className="text-lg font-semibold mb-2">Quiz</h4>
      <Input
        label="Quiz Title"
        value={quiz.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...quiz, title: e.target.value })}
      />

      {quiz.questions.map((q, index) => (
        <Card key={index}>
          <Input
            label="Question"
            value={q.question}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuestion(index, 'question', e.target.value)}
          />
          <div className='grid grid-cols-2 gap-4'>
          {q.options.map((opt, i) => (
            <Input
              key={i}
              label={`Option ${i + 1}`}
              value={opt}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const opts = [...q.options];
                opts[i] = e.target.value;
                updateQuestion(index, 'options', opts as any);
              }}
            />
          ))}
          </div>
          <Input
            label="Correct Answer"
            value={q.correctAnswer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuestion(index, 'correctAnswer', e.target.value)}
          />
          <Button onClick={() => removeQuestion(index)} variant="danger" className="mt-2">Remove</Button>
        </Card>
      ))}
      <Button onClick={addQuestion} variant="secondary">+ Add Question</Button>
    </Card>
  );
};

export default QuizForm;
