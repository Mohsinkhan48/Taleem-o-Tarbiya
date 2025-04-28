import React, { useState } from "react";
import Badge from "../../../Reusable/Badge";
import { TiTick } from "react-icons/ti";
import TagList from "../../../Course/TagList";
import Button from "../../../Reusable/Button";
import Modal from "../../../Reusable/Modal";
import CourseDetailsForm, {
  CourseDetails,
} from "../CreateCourse/CourseDetailsForm";
import { Course } from "../../../../types/course.types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { updateCourse } from "../../../../redux/slices/updateCourseSlice";

interface EditThumbnailProps {
  course: Course;
  onSubmit: () => void;
}
const EditCourseDetails: React.FC<EditThumbnailProps> = ({
  course,
  onSubmit,
}) => {
  const [modal, setModal] = useState(false);
  const [newCourseDetails, setNewCourseDetails] = useState<CourseDetails>({
    title: course.title,
    content: course.content,
    category: course.category._id,
    description: course.description,
    duration: course.duration,
    isPaid: course.isPaid,
    level: course.level._id,
    price: course.price,
    tags: course.tags.map((tag) => tag._id),
    modules: []
  });
  const { loading } = useSelector((state: RootState) => state.updateCourse);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;
    setNewCourseDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeContent = (value: string) => {
    setNewCourseDetails((prev) => ({
      ...prev,
      content: value,
    }));
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async () => {
    const updatedCourseData = {
      ...newCourseDetails,
      courseId: course._id,
    };
    await dispatch(updateCourse(updatedCourseData));
    setModal(false);
    onSubmit();
  };
  return (
    <>
      <div className="pb-6 mx-auto space-y-4 w-3/4 text-text">
        <div className="flex gap-4 items-center">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          {course.isPublished ? (
            <Badge className="bg-card text-success">
              <TiTick size={20} /> Published
            </Badge>
          ) : (
            <Badge className="bg-card text-primary"> Draft </Badge>
          )}
        </div>
        <p>{course.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-fit">
          <div className="bg-card rounded py-2 px-4 text-primary">
            {course.duration}
          </div>
          <div className="bg-card rounded py-2 px-4 text-primary">
            {course.category.name}
          </div>
          <div className="bg-card rounded py-2 px-4 text-primary">
            {course.level.name}
          </div>
          <div className="bg-card rounded py-2 px-4 text-primary">
            {course.isPaid ? course.price + " $" : "Free"}
          </div>
        </div>
        <div className="mt-6">
          <TagList tags={course.tags} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-text">
            What You Will Learn
          </h2>
          <div className="bg-card border border-card-border px-4 py-2 rounded-lg">
            <div
              className="text-text space-y-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: course.content }}
            />
          </div>
        </div>
        <div className="mt-6">
          <Button variant="secondary" onClick={() => setModal(true)}>
            Edit Course Info
          </Button>
        </div>
      </div>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <div className="max-w-3xl">
          <CourseDetailsForm
            course={newCourseDetails}
            handleChange={handleChange}
            handleChangeContent={handleChangeContent}
            setTags={(tags) =>
              setNewCourseDetails((prev) => ({ ...prev, tags }))
            }
          />
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="mt-10"
            isLoading={loading}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EditCourseDetails;
