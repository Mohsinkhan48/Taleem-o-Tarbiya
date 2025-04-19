import React, { useState } from "react";
import { Module } from "../../types/course.types";
import { FaClipboardList } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { BsPlay } from "react-icons/bs";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const ModuleCard: React.FC<{ module: Module }> = ({ module }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div key={module._id}>
      <div
        className={`p-4 cursor-pointer flex justify-between items-center`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-2xl font-bold text-primary">{module.title}</h3>
        {isOpen ? (
          <HiChevronUp className="w-6 h-6 text-text" />
        ) : (
          <HiChevronDown className="w-6 h-6 text-text" />
        )}
      </div>

      {/* Module Content */}
      {isOpen && (
        <div className="p-6 space-y-6 bg-background rounded-lg transition-all duration-300 ease-in-out">
          {module.chapters.length > 0 ? (
            module.chapters.map((chapter) => (
              <div
                key={chapter._id}
                className="bg-card p-4 rounded-lg shadow-sm border border-card-border"
              >
                <div className="mb-2">
                  <h4 className="text-lg font-semibold text-text flex items-center gap-2">
                    <BsPlay className="text-accent" /> {chapter.title}
                  </h4>
                  <p className="text-text mt-1">{chapter.content}</p>
                </div>

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
            ))
          ) : (
            <p className="text-border">No chapters available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
