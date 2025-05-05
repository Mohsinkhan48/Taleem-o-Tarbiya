// components/ChapterForm.tsx
import React, { useState } from "react";
import { FiTrash2, FiPlus, FiEdit } from "react-icons/fi"; // Icons
import Card from "../../../../Reusable/Card";
import Input from "../../../../Reusable/Input";
import Modal from "../../../../Reusable/Modal";
import QuizForm from "./QuizForm";
import { Assignment, Chapter, Quiz } from "../../../../../types/course.types";
import RichTextEditor from "../../../../Reusable/RichTextEditor";
import Checkbox from "../../../../Reusable/Checkbox";
import AssignmentForm from "./AssignmentForm";

interface Props {
  chapter: Chapter;
  onChange: (updated: Chapter) => void;
  onRemove: () => void;
}

const ChapterForm: React.FC<Props> = ({ chapter, onChange, onRemove }) => {
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);

  const updateQuiz = (quiz: Quiz) => onChange({ ...chapter, quiz });
  const updateAssignment = (assignment: Assignment) =>
    onChange({ ...chapter, assignment });

  return (
    <Card className="p-4 rounded-lg mb-4 relative">
      {/* Delete Button Top Right */}
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 text-error"
      >
        <FiTrash2 size={20} />
      </button>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4 mb-6 mt-4">
        <Input
          label="Title"
          value={chapter.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...chapter, title: e.target.value })
          }
        />
        <Input
          label="Video URL"
          value={chapter.videoUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ ...chapter, videoUrl: e.target.value })
          }
        />
      </div>

      {/* Content Editor */}
      <div className="mb-4">
        <RichTextEditor
          label="Content"
          value={chapter.content}
          onChange={(text) => onChange({ ...chapter, content: text })}
        />
      </div>

      {/* Preview Checkbox */}
      <Checkbox
        label="Preview"
        checked={chapter.isPreview}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ ...chapter, isPreview: e.target.checked })
        }
      />

      {/* Quiz Section */}
      <div className="flex items-center justify-between mt-6">
        {chapter.quiz ? (
          <Card className="p-2 flex-1 mr-2">
            <div className="text-sm font-medium">{chapter.quiz.title || "Untitled Quiz"}</div>
            <div className="text-xs text-text">{chapter.quiz.questions && chapter.quiz.questions.length} Questions</div>
          </Card>
        ) : (
          <div className="flex-1 mr-2 text-text text-sm italic">
            No Quiz
          </div>
        )}
        <button
          className="text-primary transition"
          onClick={() => setQuizModalOpen(true)}
        >
          {chapter.quiz ? <FiEdit size={20} /> : <FiPlus size={20} />}
        </button>
      </div>

      {/* Assignment Section */}
      <div className="flex items-center justify-between mt-4">
        {chapter.assignment ? (
          <Card className="p-2 flex-1 mr-2">
            <div className="text-sm font-medium">{chapter.assignment.title || "Untitled Assignment"}</div>
            <div className="text-xs text-text">
              Due: {chapter.assignment.dueDate?.split("T")[0]}
            </div>
          </Card>
        ) : (
          <div className="flex-1 mr-2 text-text text-sm italic">
            No Assignment
          </div>
        )}
        <button
          className="text-primary transition"
          onClick={() => setAssignmentModalOpen(true)}
        >
          {chapter.assignment ? <FiEdit size={20} /> : <FiPlus size={20} />}
        </button>
      </div>

      {/* Modals */}
      <Modal isOpen={quizModalOpen} onClose={() => setQuizModalOpen(false)}>
        <QuizForm
          quiz={chapter.quiz}
          onChange={(q) => updateQuiz(q)}
        />
      </Modal>

      <Modal
        isOpen={assignmentModalOpen}
        onClose={() => setAssignmentModalOpen(false)}
      >
        <AssignmentForm
          assignment={chapter.assignment}
          onChange={(a) => updateAssignment(a)}
        />
      </Modal>
    </Card>
  );
};

export default ChapterForm;
