import React, { useState } from "react";
import { Quiz } from "../../../../types/course.types";

interface Props {
  quiz: Quiz;
  moduleId: string;
  chapterTitle: string;
  courseId: string;
}

const QuizSection: React.FC<Props> = ({ quiz, moduleId, chapterTitle, courseId }) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleSelect = (questionIndex: number, answer: string) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) {
        correct += 1;
      }
    });

    const calculatedScore = Math.round((correct / quiz.questions.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);

    // TODO: POST score to API
    // POST /api/progress/submitQuizScore with { studentId, courseId, moduleId, chapterTitle, score }
  };

  return (
    <div className="border-t border-border pt-4 space-y-3">
      <h4 className="font-medium text-secondary">{quiz.title}</h4>

      {quiz.questions.map((q, idx) => (
        <div key={idx} className="space-y-1">
          <p className="text-sm font-semibold">{`${idx + 1}. ${q.question}`}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((option, optIdx) => (
              <label
                key={optIdx}
                className={`cursor-pointer text-sm px-3 py-2 border rounded-xl transition
                  ${answers[idx] === option ? 'bg-accent/10 border-accent' : 'border-input-border'}`}
              >
                <input
                  type="radio"
                  name={`question-${idx}`}
                  value={option}
                  className="hidden"
                  onChange={() => handleSelect(idx, option)}
                  disabled={submitted}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-button-primary text-button-text rounded-xl hover:bg-button-hover-primary"
        >
          Submit Quiz
        </button>
      ) : (
        <div className="text-sm text-success font-medium">Quiz submitted! Score: {score}%</div>
      )}
    </div>
  );
};

export default QuizSection;
