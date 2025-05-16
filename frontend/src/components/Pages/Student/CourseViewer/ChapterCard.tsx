import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { Chapter } from "../../../../types/course.types";
import Badge from "../../../Reusable/Badge";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import Modal from "../../../Reusable/Modal";
import QuizAttempt from "./QuizAttempt";
import AssignmentSection from "./AssignmentSection";
import DropdownMenu from "../../../Reusable/DropdownMenu";
import DropdownItem from "../../../Reusable/DropdownItem";
import Button from "../../../Reusable/Button";
import Checkbox from "../../../Reusable/Checkbox";

interface Props {
  chapter: Chapter;
  courseId: string;
  moduleId: string;
  onClick: (chapter: Chapter, moduleId: string) => void;
}

const ChapterCard: React.FC<Props> = ({
  chapter,
  moduleId,
  courseId,
  onClick,
}) => {
  const selectedChapter = useSelector(
    (state: RootState) => state.selectedChapter?.chapter
  );

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);

  const handleChapterClick = () => {
    onClick(chapter, moduleId);
  };

  const handleQuizOpen = () => {
    setIsQuizOpen(true);
  };

  const handleQuizClose = () => {
    setIsQuizOpen(false);
  };

  const handleAssignmentClose = () => {
    setIsAssignmentOpen(false);
  };

  const handleAssignmentOpen = () => {
    setIsAssignmentOpen(true);
  };

  return (
    <div
      className={`p-4 space-y-2 ${
        selectedChapter?._id === chapter._id ? "bg-card" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <Checkbox checked={chapter.lecture?.progress?.completed} />
        <h3
          className="text-md font-semibold text-primary cursor-pointer hover:underline"
          onClick={handleChapterClick}
        >
          {chapter.title}
        </h3>
      </div>

      <div className="flex justify-between">
        {/* Resources Section */}
        {chapter.resources && chapter.resources.length > 0 && (
          <DropdownMenu
            button={
              <Button size="sm" variant="secondary">
                Resources
              </Button>
            }
            menuClassName="bg-card border border-border rounded-md p-1"
          >
            {chapter.resources.map((resource, idx) => (
              <DropdownItem
                key={idx}
                onClick={() =>
                  window.open(resource.url, "_blank", "noopener,noreferrer")
                }
              >
                <div className="flex items-center gap-2">
                  <FaFileAlt className="text-accent" />
                  <span>{resource.name}</span>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
        {/* Extras: Quiz and Assignment */}
        {(chapter.quiz || chapter.assignment) && (
          <div className="flex flex-col gap-2 flex-wrap">
            {chapter.quiz && <Badge onClick={handleQuizOpen}>Quiz</Badge>}
            {chapter.assignment && (
              <Badge onClick={handleAssignmentOpen}>Assignment</Badge>
            )}
          </div>
        )}
      </div>

      {/* Quiz Modal */}
      {chapter.quiz && (
        <Modal isOpen={isQuizOpen} onClose={handleQuizClose}>
          <QuizAttempt
            courseId={courseId}
            moduleId={moduleId}
            chapterId={chapter._id!}
            quizId={chapter.quiz._id!}
            questions={chapter.quiz.questions}
            onClose={handleQuizClose}
            title={chapter.quiz.title}
          />
        </Modal>
      )}
      {chapter.assignment && (
        <Modal isOpen={isAssignmentOpen} onClose={handleAssignmentClose}>
          <AssignmentSection
            courseId={courseId}
            chapterId={chapter._id!}
            moduleId={moduleId}
            assignment={chapter.assignment}
          />
        </Modal>
      )}
    </div>
  );
};

export default ChapterCard;
