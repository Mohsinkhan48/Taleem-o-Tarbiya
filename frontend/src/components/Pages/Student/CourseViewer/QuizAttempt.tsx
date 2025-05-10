import React, { useEffect, useState } from "react";
import { Question } from "../../../../types/course.types";
import { CourseService } from "../../../../service/courseService";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Loader } from "../../../../assets/Loader";
import Button from "../../../Reusable/Button";
import Card from "../../../Reusable/Card";

interface Props {
  courseId: string;
  moduleId: string;
  chapterId: string;
  quizId: string;
  questions: Question[];
  onClose: () => void;
}

const QuizAttempt: React.FC<Props> = ({
  courseId,
  moduleId,
  chapterId,
  quizId,
  questions,
  onClose,
}) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [quizProgress, setQuizProgress] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const currentQuestion = questions[current];

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await CourseService.getQuizProgress(
          courseId,
          moduleId,
          chapterId,
          quizId
        );
        if (response?.data?.result) {
          setQuizProgress(response.data.result);
        }
      } catch (err) {
        // No progress found or API failed — proceed with normal flow
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [courseId, moduleId, chapterId, quizId]);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion._id!]: answer });
  };

  const next = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const response = await CourseService.submitQuiz(
        courseId,
        moduleId,
        chapterId,
        quizId,
        Object.values(answers)
      );

      if (response.data?.success === true) {
        setSuccess("🎉 Quiz submitted successfully!");
        setTimeout(onClose, 2000);
      } else {
        setError("Something went wrong!");
      }
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-xl font-medium text-primary">
        <Loader className="mr-3"/> Loading Quiz...
      </div>
    );
  }

  if (quizProgress) {
    return (
      <div className="w-full p-6 max-w-xl space-y-4">
        <h2 className="text-xl font-bold text-success flex items-center gap-2">
          <AiOutlineCheckCircle className="text-success text-2xl" />
          Quiz Already Attempted
        </h2>
        <p className="text-text">
          You scored <span className="font-semibold text-primary">{quizProgress.score}</span> out of{" "}
          <span className="font-semibold text-primary">{quizProgress.total}</span>
        </p>

        <div className="divide-y">
          {quizProgress.answers.map((ans: any, idx: number) => (
            <div key={idx} className="py-3">
              <p className="font-medium mb-1 text-text">{idx + 1}. {ans.question}</p>
              <p
                className={`flex items-center gap-2 text-sm font-semibold ${
                  ans.isCorrect ? "text-success" : "text-error"
                }`}
              >
                {ans.isCorrect ? (
                  <AiOutlineCheckCircle className="text-lg" />
                ) : (
                  <AiOutlineCloseCircle className="text-lg" />
                )}
                {ans.selectedOption}
              </p>
            </div>
          ))}
        </div>

        <Button
          onClick={onClose}
          variant="secondary"
        >
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl p-6 space-y-6">
      <h2 className="text-xl font-bold text-primary">
        Question {current + 1} of {questions.length}
      </h2>

      <Card className=" rounded-lg p-5">
        <h3 className="text-md font-semibold mb-4 text-text">{currentQuestion.question}</h3>

        <div className="space-y-2">
          {currentQuestion.options.map((opt, idx) => (
            <label
              key={idx}
              className={`flex items-center p-3 rounded-md border cursor-pointer transition-all
                ${
                  answers[currentQuestion._id!] === opt
                    ? " text-primary border-border"
                    : " border-border"
                }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion._id}`}
                value={opt}
                checked={answers[currentQuestion._id!] === opt}
                onChange={() => handleAnswer(opt)}
                className="hidden"
              />
              {opt}
            </label>
          ))}
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={prev}
          disabled={current === 0}
          variant="primary"
          className="flex items-center gap-2"
        >
          <FaArrowLeft />
          Previous
        </Button>

        {current < questions.length - 1 ? (
          <Button
            onClick={next}
            disabled={!answers[currentQuestion._id!]}
            variant="primary"
            className="flex items-center gap-2"          >
            Next <FaArrowRight />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !answers[currentQuestion._id!]}
            variant="success"
            className="flex items-center gap-2"          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader /> Submitting...
              </span>
            ) : (
              "Submit Quiz"
            )}
          </Button>
        )}
      </div>

      {success && <p className="text-success text-sm mt-2">{success}</p>}
      {error && <p className="text-error text-sm mt-2">{error}</p>}
    </div>
  );
};

export default QuizAttempt;
