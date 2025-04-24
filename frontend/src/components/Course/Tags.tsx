// components/Course/TagList.tsx
import React, { useState } from "react";
import Badge from "../Reusable/Badge";
import Modal from "../Reusable/Modal";
import { CourseTag } from "../../redux/slices/fetch/fetchSlices";

interface TagListProps {
  tags: CourseTag[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!tags || tags.length === 0) return null;

  const visibleTags = tags.slice(0, 5);
  const hiddenTags = tags.slice(5);

  return (
    <div className="mb-6">
      <strong className="text-text block mb-2">Tags:</strong>
      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <Badge key={tag._id} className="bg-card text-primary">
            {tag.name}
          </Badge>
        ))}
        {hiddenTags.length > 0 && (
          <Badge
            onClick={() => setIsModalOpen(true)}
            className="bg-background text-text"
          >
            +{hiddenTags.length} more
          </Badge>
        )}
      </div>

      {/* Modal for All Tags */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4 text-text">All Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag._id} className="bg-card text-primary">
              {tag.name}
            </Badge>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default TagList;
