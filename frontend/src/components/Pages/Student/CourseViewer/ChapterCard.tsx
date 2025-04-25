import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { Chapter } from "../../../../types/course.types";
import Badge from "../../../Reusable/Badge";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { setSelectedChapter } from "../../../../redux/slices/selectedChapter";

interface Props {
  chapter: Chapter;
}

const ChapterCard: React.FC<Props> = ({ chapter }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleChapterClick = () => {
    dispatch(setSelectedChapter(chapter));
  };
  const selectedChapter = useSelector(
    (state: RootState) => state.selectedChapter?.selectedChapter
  );  
  console.log(selectedChapter)
  return (
    <div className={`px-6 py-4 space-y-4 ${selectedChapter?._id === chapter._id ? "bg-card" : ""}`}>
      {/* Chapter Title */}
      <h3
        className="text-md font-semibold text-primary cursor-pointer hover:underline"
        onClick={handleChapterClick}
      >
        {chapter.title}
      </h3>

      {/* Resources Section */}
      {chapter.resources && chapter.resources.length > 0 && (
        <div className="space-y-1">
          <h4 className="text-sm font-medium text-muted">Resources</h4>
          <ul className="ml-4 list-disc text-sm space-y-1">
            {chapter.resources.map((resource, idx) => (
              <li key={idx}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-link hover:underline"
                >
                  <FaFileAlt className="text-accent" />
                  <span>{resource.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Extras: Quiz and Assignment */}
      {(chapter.quiz || chapter.assignment) && (
        <>
          {chapter.quiz && <Badge>1 Quiz</Badge>}
          {chapter.assignment && <Badge>1 Assignment</Badge>}
        </>
      )}
    </div>
  );
};

export default ChapterCard;
