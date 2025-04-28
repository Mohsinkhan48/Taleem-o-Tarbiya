import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import ImageUpload from "../../../Reusable/ImageUpload";
import Button from "../../../Reusable/Button";
import { BACKEND_URL } from "../../../../constants/env.constants";
import { uploadThumbnail } from "../../../../redux/slices/uploadThumbnailSlice";
import { Course } from "../../../../types/course.types";

interface EditThumbnailProps {
  course: Course;
}

const EditThumbnail: React.FC<EditThumbnailProps> = ({ course }) => {
  const { loading: thumbnailLoading } = useSelector(
    (state: RootState) => state.uploadThumbnail
  );
  const [newImage, setNewImage] = useState<File | string | undefined>(
    undefined
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    resetImage();
  }, []);
  const resetImage = () => {
    if (course?.image) {
      setNewImage(`${BACKEND_URL}${course.image}`);
    }
  };
  return (
    <div className="flex flex-col gap-6 w-1/4">
      <ImageUpload
        name="courseImage"
        value={newImage}
        onChange={(file) => setNewImage(file)}
        label="Course Image"
      />
      {/* You can add a button to save the new image later */}
      <div className="flex gap-4">
        <Button
          isLoading={thumbnailLoading}
          variant="secondary"
          onClick={async () => {
            if (newImage && typeof newImage !== "string" && course?._id) {
              await dispatch(
                uploadThumbnail({
                  courseId: course?._id,
                  file: newImage,
                })
              );
            }
          }}
        >
          Save Image
        </Button>
        <Button variant="secondary" onClick={() => resetImage()}>
          Reset Image
        </Button>
      </div>
    </div>
  );
};

export default EditThumbnail;
