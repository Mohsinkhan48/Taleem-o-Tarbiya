import { Module } from "../../../../../types/course.types";
import Button from "../../../../Reusable/Button";
import ChapterCard from "./ChapterCard";

const ModuleCard = ({module}: {module: Module}) => {
  return (
    <div className="bg-background border border-border p-4 rounded-lg">
      {module.title}
      <div className="mt-6 space-y-3">
        {module.chapters.map((chapter)=> <ChapterCard chapter={chapter}/>)}
      </div>
      <Button variant="primary" className="mt-3">
        Add Chapter
      </Button>
    </div>
  );
};

export default ModuleCard;
