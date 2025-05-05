// CreateCourseForm.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { createCourse } from "../../../../redux/slices/createCourseSlice";

import Button from "../../../Reusable/Button";
import Card from "../../../Reusable/Card";
import ImageUpload from "../../../Reusable/ImageUpload";
import { uploadThumbnail } from "../../../../redux/slices/uploadThumbnailSlice";

import CourseDetailsForm, { CourseDetails } from "./CourseDetailsForm";
import ModuleForm from "./ModuleForm";
import { Module } from "../../../../types/course.types";

const CreateCourseForm: React.FC = () => {
  const initialValues: CourseDetails = {
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

  const [course, setCourse] = useState<CourseDetails>(initialValues);
  const [thumbnail, setThumbnail] = useState<File | string | undefined>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.createCourse);

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

  const updateModule = (index: number, updatedModule: Module) => {
    const updatedModules = [...course.modules];
    updatedModules[index] = updatedModule;
    setCourse((prev) => ({
      ...prev,
      modules: updatedModules,
    }));
  };

  const addModule = () => {
    setCourse((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        { title: "", chapters: [] },
      ],
    }));
  };

  const removeModule = (index: number) => {
    const updatedModules = [...course.modules];
    updatedModules.splice(index, 1);
    setCourse((prev) => ({
      ...prev,
      modules: updatedModules,
    }));
  };

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
        {/* Left side: Course Details */}
        <div className="flex-1">
          <CourseDetailsForm
            course={course}
            handleChange={handleChange}
            handleChangeContent={handleChangeContent}
            setTags={(tags) => setCourse((prev) => ({ ...prev, tags }))}
          />

          {/* Modules */}
          <h3 className="text-xl font-semibold mt-8 mb-4">Modules</h3>
          {course.modules.map((module, index) => (
            <ModuleForm
              key={index}
              module={module}
              onChange={(updatedModule) => updateModule(index, updatedModule)}
              onRemove={() => removeModule(index)}
            />
          ))}

          <div className="mb-6">
            <Button variant="secondary" onClick={addModule}>
              + Add Module
            </Button>
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

        {/* Right side: Thumbnail Upload */}
        <div className="w-full lg:w-[300px]">
          <ImageUpload
            label="Course Thumbnail"
            name="image"
            onChange={(file) => setThumbnail(file)}
            value={thumbnail}
          />
        </div>
      </div>
    </Card>
  );
};

export default CreateCourseForm;
