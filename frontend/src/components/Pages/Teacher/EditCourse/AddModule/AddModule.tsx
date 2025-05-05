import { useState } from "react";
import { Module, Chapter } from "../../../../../types/course.types";
import Input from "../../../../Reusable/Input";
import Button from "../../../../Reusable/Button";
import ChapterForm from "../EditModule/ChapterForm";

const AddModule = () => {
  const [module, setModule] = useState<Module>({
    chapters: [],
    title: "",
  });
  const updateChapter = (index: number, chapter: Chapter) => {
    const updated = [...module.chapters];
    updated[index] = chapter;
    setModule({ ...module, chapters: updated });
  };

  const addChapter = () => {
    setModule({
      ...module,
      chapters: [
        ...module.chapters,
        { title: "", content: "", videoUrl: "", isPreview: false },
      ],
    });
  };

  const removeChapter = (index: number) => {
    const updated = [...module.chapters];
    updated.splice(index, 1);
    setModule({ ...module, chapters: updated });
  };

  return (
    <div className="p-4 rounded-lg mb-4">
      <Input
        label="Module Title"
        value={module.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setModule({ ...module, title: e.target.value })
        }
      />

      <div className="grid grid-cols-2 gap-4">
        {module.chapters.map((chapter, index) => (
          <ChapterForm
            key={index}
            chapter={chapter}
            onChange={(updated: Chapter) => updateChapter(index, updated)}
            onRemove={() => removeChapter(index)}
          />
        ))}
      </div>

      <Button onClick={addChapter} variant="secondary">
        + Add Chapter
      </Button>
    </div>
  );
};

export default AddModule;
