// src/components/lecture/LectureUploadForm.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { uploadLectureVideo } from "../../../../redux/slices/lectureUploadSlice";
import Button from "../../../Reusable/Button";
import FileInput from "../../../Reusable/FileInput";
import { Lecture } from "../../../../types/course.types";

interface Props {
  courseId: string;
  moduleId: string;
  chapterId: string;
  existingLecture?: Lecture;
  onClose: () => void;
}

const LectureForm = ({
  courseId,
  moduleId,
  chapterId,
  existingLecture,
  onClose,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.lectureUpload);

  const [title, setTitle] = useState(existingLecture?.title || "");
  const [description, setDescription] = useState(
    existingLecture?.description || ""
  );
  const [file, setFile] = useState<File | null>(null);

  const isEditMode = Boolean(existingLecture);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !isEditMode) return;
    if (file)
      dispatch(
        uploadLectureVideo({
          courseId,
          moduleId,
          chapterId,
          title,
          description,
          file,
        })
      ).then(() => {
        onClose();
      });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">
        {isEditMode ? "Edit Lecture" : "Add Lecture"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FileInput
          label={isEditMode ? "Replace Video (optional)" : "Upload Video"}
          onChange={setFile}
          required={!isEditMode}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={loading} variant="primary">
            {isEditMode ? "Update Lecture" : "Upload Lecture"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LectureForm;
