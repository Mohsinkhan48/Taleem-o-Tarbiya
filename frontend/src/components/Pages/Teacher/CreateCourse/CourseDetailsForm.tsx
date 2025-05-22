// CourseDetailsForm.tsx
import React, { useEffect } from "react";
import Input from "../../../Reusable/Input";
import SelectInput from "../../../Reusable/SelectInput";
import MultiSelectInput from "../../../Reusable/MultiSelectInput";
import Checkbox from "../../../Reusable/Checkbox";
import RichTextEditor from "../../../Reusable/RichTextEditor";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import {
  fetchCourseCategories,
  fetchCourseLevels,
  fetchCourseTags,
} from "../../../../redux/slices/fetch/fetchSlices";
import { Module } from "../../../../types/course.types";

export interface CourseDetails {
  _id?: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  price: number;
  level: string;
  category: string;
  tags: string[];
  modules: Module[];
  isPaid: boolean;
}
interface CourseDetailsFormProps {
  course: CourseDetails;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleChangeContent: (value: string) => void;
  setTags: (tags: string[]) => void;
}

const CourseDetailsForm: React.FC<CourseDetailsFormProps> = ({
  course,
  handleChange,
  handleChangeContent,
  setTags,
}) => {
  const { data: courseCategories } = useSelector((state: RootState) => state.courseCategories);
  const { data: courseLevels } = useSelector((state: RootState) => state.courseLevels);
  const { data: courseTags } = useSelector((state: RootState) => state.courseTags);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCourseCategories());
    dispatch(fetchCourseLevels());
    dispatch(fetchCourseTags());
  }, [dispatch]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
        <Input
          label="Title *"
          name="title"
          value={course.title}
          placeholder="e.g. Mastering React"
          onChange={handleChange}
        />
        <Input
          label="Description *"
          name="description"
          value={course.description}
          placeholder="Brief overview of the course"
          onChange={handleChange}
        />
        <Input
          label="Duration *"
          name="duration"
          value={course.duration}
          placeholder="e.g. 6 weeks"
          onChange={handleChange}
        />

        <SelectInput
          label="Level *"
          name="level"
          value={course.level}
          onChange={handleChange}
          options={courseLevels?.map((lvl) => ({
            label: lvl.name,
            value: lvl._id,
          }))}
        />
        <SelectInput
          label="Category *"
          name="category"
          value={course.category}
          onChange={handleChange}
          options={courseCategories?.map((cat) => ({
            label: cat.name,
            value: cat._id,
          }))}
        />
        <MultiSelectInput
          label="Tags"
          selectedValues={course.tags}
          onChange={setTags}
          options={courseTags?.map((tag) => ({
            label: tag.name,
            value: tag._id,
          }))}
        />

        <Checkbox
          checked={course.isPaid}
          name="isPaid"
          label="Is Paid?"
          onChange={handleChange}
        />

        {course.isPaid && (
          <div className="transition-all duration-300 ease-in-out">
            <Input
              label="Price *"
              name="price"
              type="number"
              placeholder="e.g. 199"
              value={course.price}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      <div className="mt-6">
        <RichTextEditor
          label="Content"
          value={course.content}
          onChange={handleChangeContent}
        />
      </div>
    </>
  );
};

export default CourseDetailsForm;
