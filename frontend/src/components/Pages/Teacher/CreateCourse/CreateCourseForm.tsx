import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { createCourse } from "../../../../redux/slices/createCourseSlice";

import Input from "../../../Reusable/Input";
import SelectInput from "../../../Reusable/SelectInput";
import MultiSelectInput from "../../../Reusable/MultiSelectInput";
import Button from "../../../Reusable/Button";
import Card from "../../../Reusable/Card";
import { Module } from "../../../../types/course.types";
import {
  fetchCourseCategories,
  fetchCourseLevels,
  fetchCourseTags,
} from "../../../../redux/slices/fetch/fetchSlices";
import Checkbox from "../../../Reusable/Checkbox";
import ImageUpload from "../../../Reusable/ImageUpload";
import RichTextEditor from "../../../Reusable/RichTextEditor";
import { uploadThumbnail } from "../../../../redux/slices/uploadThumbnailSlice";

const CreateCourseForm: React.FC = () => {
  interface CreateCourse {
    title: string;
    description: string;
    content: string;
    duration: string;
    price: number;
    level: string;
    category: string;
    tags: string[];
    isPaid: boolean;
    modules: Module[];
  }

  const initialValues: CreateCourse = {
    title: "",
    description: "",
    content: "",
    duration: "",
    price: 0,
    level: "",
    category: "",
    tags: [],
    isPaid: false,
    modules: [],
  };

  const [course, setCourse] = useState<CreateCourse>(initialValues);
  const [thumbnail, setThumbnail] = useState<File | string | undefined>();
  const dispatch = useDispatch<AppDispatch>();

  const { courseCategories, courseLevels, courseTags } = useSelector(
    (state: RootState) => ({
      courseCategories: state.courseCategories.data,
      courseLevels: state.courseLevels.data,
      courseTags: state.courseTags.data,
    })
  );

  useEffect(() => {
    dispatch(fetchCourseCategories());
    dispatch(fetchCourseLevels());
    dispatch(fetchCourseTags());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;
    setCourse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleChangeContent = (value: string) => {
    setCourse((prev) => ({
      ...prev,
      content: value,
    }));
  };
  const { loading } = useSelector(
    (state: RootState) => state.createCourse
  );
  const handleSubmit = async () => {
    const result = await dispatch(createCourse(course));
    if (createCourse.fulfilled.match(result)) {
      const createdCourse = result.payload;
      if (thumbnail && typeof thumbnail !== "string" && createdCourse?._id) {
        await dispatch(
          uploadThumbnail({ courseId: createdCourse?._id, file: thumbnail })
        );
      }
      setCourse(initialValues);
      setThumbnail(undefined);
    } else if (createCourse.rejected.match(result)) {
      console.error("Error creating course:", result.payload);
    }
  };

  return (
    <Card className="rounded-lg p-8 m-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Create New Course</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
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
              options={courseLevels.map((lvl: any) => ({
                label: lvl.name,
                value: lvl._id,
              }))}
            />
            <SelectInput
              label="Category *"
              name="category"
              value={course.category}
              onChange={handleChange}
              options={courseCategories.map((cat: any) => ({
                label: cat.name,
                value: cat._id,
              }))}
            />
            <MultiSelectInput
              label="Tags"
              selectedValues={course.tags}
              onChange={(selected) =>
                setCourse((prev) => ({ ...prev, tags: selected }))
              }
              options={courseTags.map((tag: any) => ({
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

            {/* Conditional Price Field */}
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
          <div className="mt-6">
            <Button
              variant="primary"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Submit Course
            </Button>
          </div>
        </div>

        {/* Right Side: Image Upload */}
        <div className="w-full lg:w-[300px]">
          <ImageUpload
            label="Course Thumbnail"
            name="image"
            onChange={(file) => {
              setThumbnail(file);
            }}
            value={thumbnail}
          />
        </div>
      </div>
    </Card>
  );
};

export default CreateCourseForm;
