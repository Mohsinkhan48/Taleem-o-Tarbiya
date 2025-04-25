import React, { useState } from "react";
import { Assignment } from "../../../../types/course.types";

interface Props {
  assignment: Assignment;
  moduleId: string;
  chapterTitle: string;
  courseId: string;
}

const AssignmentSection: React.FC<Props> = ({ assignment, moduleId, chapterTitle, courseId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("moduleId", moduleId);
    formData.append("chapterTitle", chapterTitle);
    formData.append("courseId", courseId);

    // TODO: POST formData to assignment submission API
    // POST /api/progress/submitAssignment with formData

    setSubmitted(true);
  };

  return (
    <div className="border-t border-border pt-4 space-y-2">
      <h4 className="font-medium text-secondary">{assignment.title}</h4>
      <p className="text-sm text-text">{assignment.description}</p>
      <p className="text-xs text-warning">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>

      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={handleFileChange}
        className="block w-full mt-2 text-sm text-input-border"
      />

      <button
        onClick={handleSubmit}
        disabled={!file || submitted}
        className="px-4 py-2 mt-2 bg-button-secondary text-button-text rounded-xl hover:bg-button-hover-secondary"
      >
        {submitted ? "Submitted!" : "Submit Assignment"}
      </button>
    </div>
  );
};

export default AssignmentSection;
