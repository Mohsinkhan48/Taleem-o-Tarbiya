import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { BsPlay } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { Chapter } from "../../types/course.types";

interface Props {
  chapter: Chapter;
}

const ChapterCard: React.FC<Props> = ({ chapter }) => {
  return (
    <div
    key={chapter._id}
    className="p-4"
  >
    <div className="mb-2">
      <h4 className="text-lg font-semibold text-text flex items-center gap-2">
        <BsPlay className="text-accent" /> {chapter.title}
      </h4>
      <div
              className="text-text space-y-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: chapter.content }}
            />    </div>

    <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-text">
      {chapter.quiz ? (
        <div className="flex items-center gap-2">
          <FaClipboardList className="text-success" />
          <span>Quiz: {chapter.quiz.title}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-text italic">
          <FaClipboardList />
          <span>No quiz</span>
        </div>
      )}

      {chapter.assignment ? (
        <div className="flex items-center gap-2">
          <FiFileText className="text-info" />
          <span>Assignment: {chapter.assignment.title}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-text italic">
          <FiFileText />
          <span>No assignment</span>
        </div>
      )}
    </div>
  </div>
  );
};

export default ChapterCard;
