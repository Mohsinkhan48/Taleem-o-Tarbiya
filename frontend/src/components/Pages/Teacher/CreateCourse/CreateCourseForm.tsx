import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { createCourse } from "../../../../redux/slices/createCourseSlice";

import ModuleForm from "./ModuleForm";
import Input from "../../../Reusable/Input";
import SelectInput from "../../../Reusable/SelectInput";
import MultiSelectInput from "../../../Reusable/MultiSelectInput";
import Button from "../../../Reusable/Button";
import Card from "../../../Reusable/Card";
import { Module } from "../../../../types/course.types";
import { fetchCourseCategories, fetchCourseLevels, fetchCourseTags } from "../../../../redux/slices/fetch/fetchSlices";
import Checkbox from "../../../Reusable/Checkbox";

const CreateCourseForm: React.FC = () => {
  interface CreateCourse {
    image: string;
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
    image: "",
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
  const dispatch = useDispatch<AppDispatch>();

  const { courseCategories, courseLevels, courseTags } = useSelector((state: RootState) => ({
    courseCategories: state.courseCategories.data,
    courseLevels: state.courseLevels.data,
    courseTags: state.courseTags.data,
  }));

  useEffect(() => {
    dispatch(fetchCourseCategories());
    dispatch(fetchCourseLevels());
    dispatch(fetchCourseTags());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;
    console.log("checkbox: ", checked)
    console.log("name: ", name)
    console.log("value: ", value)
    setCourse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  console.log(course)
  const handleSubmit = async () => {
    const result = await dispatch(createCourse(course));
    if (createCourse.fulfilled.match(result)) {
      console.log("Course created:", result.payload);
      setCourse(initialValues);
    } else if (createCourse.rejected.match(result)) {
      console.error("Error creating course:", result.payload);
    }
  };

  return (
    <Card className="rounded-lg p-8 m-8">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Image URL" name="image" value={course.image} onChange={handleChange} />
        <Input label="Title" name="title" value={course.title} onChange={handleChange} />
        <Input label="Description" name="description" value={course.description} onChange={handleChange} />
        <Input label="Content" name="content" value={course.content} onChange={handleChange} />
        <Input label="Duration" name="duration" value={course.duration} onChange={handleChange} />
        <Input label="Price" name="price" type="number" value={course.price} onChange={handleChange} />

        {/* ✅ Updated fields */}
        <SelectInput
          label="Level"
          name="level"
          value={course.level}
          onChange={handleChange}
          options={courseLevels.map((lvl: any) => ({ label: lvl.name, value: lvl._id }))}
        />
        <SelectInput
          label="Category"
          name="category"
          value={course.category}
          onChange={handleChange}
          options={courseCategories.map((cat: any) => ({ label: cat.name, value: cat._id }))}
        />

        <MultiSelectInput
          label="Tags"
          selectedValues={course.tags}
          onChange={(selected) => setCourse(prev => ({ ...prev, tags: selected }))}
          options={courseTags.map((tag: any) => ({ label: tag.name, value: tag._id }))}
        />

        <Checkbox
          checked={course.isPaid}
          name="isPaid"
          label="Is Paid?"
          onChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Modules</h3>
        {course.modules.map((module, index) => (
          <ModuleForm
            key={index}
            module={module}
            onChange={(updatedModule) => {
              const modules = [...course.modules];
              modules[index] = updatedModule;
              setCourse((prev) => ({ ...prev, modules }));
            }}
            onRemove={() => {
              const modules = [...course.modules];
              modules.splice(index, 1);
              setCourse((prev) => ({ ...prev, modules }));
            }}
          />
        ))}
        <Button variant="secondary" onClick={() =>
          setCourse(prev => ({ ...prev, modules: [...prev.modules, { title: "", chapters: [] }] }))
        }>
          Add Module
        </Button>
      </div>

      <div className="mt-6">
        <Button variant="primary" onClick={handleSubmit}>
          Submit Course
        </Button>
      </div>
    </Card>
  );
};

export default CreateCourseForm;
