import { useState } from "react";
import { Chapter, Module } from "../../../../../types/course.types";
import Button from "../../../../Reusable/Button";
import ChapterCard from "./ChapterCard";
import ChapterForm from "./ChapterForm";
import { AppDispatch } from "../../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addChapter, resetChapter } from "../../../../../redux/slices/addChapterSlice";
import { RootState } from "../../../../../redux/store";

const ModuleCard = ({ module }: { module: Module }) => {
  const [isAddChapter, setIsAddChapter] = useState<boolean>(false);
  const [newChapter, setNewChapter] = useState<Chapter>({
    title: "",
    content: "",
    isPreview: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.addChapter);

  const onSubmit = async () => {
    if (!newChapter.title.trim()) return;

    await dispatch(addChapter({ moduleId: module._id!, chapterData: newChapter }));
    dispatch(resetChapter());
    setIsAddChapter(false);
    setNewChapter({
      title: "",
      content: "",
      isPreview: false,
    });
  };

  return (
    <div className="bg-background border border-border p-4 rounded-lg">
      <h3 className="text-lg font-semibold">{module.title}</h3>

      <div className="mt-6 space-y-3">
        {module.chapters.map((chapter) => (
          <ChapterCard key={chapter._id} chapter={chapter} />
        ))}

        {isAddChapter && (
          <div>
            <ChapterForm
              chapter={newChapter}
              onChange={(chapter) => setNewChapter(chapter)}
              onRemove={() => setIsAddChapter(false)}
            />
            <Button
              variant="primary"
              className="mt-3"
              onClick={onSubmit}
              isLoading={loading}
            >
              Submit
            </Button>
          </div>
        )}
      </div>

      {!isAddChapter && (
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => setIsAddChapter(true)}
        >
          Add Chapter
        </Button>
      )}
    </div>
  );
};

export default ModuleCard;
