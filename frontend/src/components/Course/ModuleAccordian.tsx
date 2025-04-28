// ModuleAccordion.tsx
import React from "react";
import ChapterCard from "./ChapterCard";
import Accordion from "../Reusable/Accordian";
import { Module } from "../../types/course.types";

interface Props {
  modules: Module[];
}

const ModuleAccordion: React.FC<Props> = ({ modules }) => {
  const accordionItems = modules.map((module, index) => ({
    id: module._id || index,
    header: module.title,
    content: (
      <div className="space-y-4">
        {module.chapters.map((chapter, i) => (
          <ChapterCard key={chapter._id || i} chapter={chapter} />
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
    <div className="border border-border rounded-xl">
      <Accordion items={accordionItems} />
    </div>
  );
};

export default ModuleAccordion;
