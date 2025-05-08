// ModuleAccordion.tsx
import React from "react";
import { Module } from "../../../../types/course.types";
import ChapterCard from "./ChapterCard";
import Accordion from "../../../Reusable/Accordian";

interface Props {
  modules: Module[];
  courseId: string;
}

const ModuleAccordion: React.FC<Props> = ({ courseId, modules }) => {
  const accordionItems = modules.map((module, index) => ({
    id: module._id || index,
    header: module.title,
    content: (
      <div className="space-y-4">
        {module.chapters.map((chapter, i) => (
          <ChapterCard key={chapter._id || i} chapter={chapter} courseId={courseId} moduleId={module._id!} />
        ))}
      </div>
    ),
  }));
  if (modules.length === 0) {
    return <div className="bg-card px-6 py-4 border border-border rounded-xl">
      No Modules for this course.
    </div>
  }
  return (
    <div className="lg:block sticky max-h-[calc(100vh-12rem)] overflow-y-auto border border-border rounded-xl">
      <Accordion items={accordionItems} />
    </div>
  );
};

export default ModuleAccordion;
