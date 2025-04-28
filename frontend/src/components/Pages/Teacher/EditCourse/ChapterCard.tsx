import React from "react";
import { Chapter } from "../../../../types/course.types";
import Badge from "../../../Reusable/Badge";
import Button from "../../../Reusable/Button";

interface Props {
  chapter: Chapter;
}

const ChapterCard: React.FC<Props> = ({ chapter }) => {
  return (
    <div className="space-y-4 flex gap-20 items-center">
      <div>
        {/* Chapter Title */}
        <h3 className="text-md font-semibold text-primary">{chapter.title}</h3>

        {/* Extras: Quiz and Assignment */}
        {(chapter.quiz || chapter.assignment || chapter.resources) && (
          <>
            {chapter.resources?.length && (
              <Badge>{chapter.resources?.length} Resources</Badge>
            )}
            {chapter.quiz && <Badge>1 Quiz</Badge>}
            {chapter.assignment && <Badge>1 Assignment</Badge>}
          </>
        )}
      </div>
      <Button variant="secondary">Edit</Button>
    </div>
  );
};

export default ChapterCard;
