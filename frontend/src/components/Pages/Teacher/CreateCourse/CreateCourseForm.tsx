// components/CreateCourseForm.tsx
import React, { useState } from "react";
import ModuleForm from "./ModuleForm";
import Input from "../../../Reusable/Input";
import Button from "../../../Reusable/Button";
import { createCourse } from "../../../../redux/slices/createCourseSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import Card from "../../../Reusable/Card";
import { Course, Module } from "../../../../types/course.types";

const CreateCourseForm: React.FC = () => {
  const initialValues = {
    image: "",
    title: "",
    description: "",
    content: "",
    duration: "",
    price: 0,
    level: "",
    category: "",
    isPaid: true,
    modules: [],
  }
  const [course, setCourse] = useState<Course>(initialValues);
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;
    setCourse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addModule = () => {
    setCourse((prev) => ({
      ...prev,
      modules: [...prev.modules, { title: "", chapters: [] }],
    }));
  };

  const updateModule = (index: number, updatedModule: Module) => {
    const modules = [...course.modules];
    modules[index] = updatedModule;
    setCourse((prev) => ({ ...prev, modules }));
  };

  const removeModule = (index: number) => {
    const modules = [...course.modules];
    modules.splice(index, 1);
    setCourse((prev) => ({ ...prev, modules }));
  };

  const handleSubmit = async () => {
    const result = await dispatch(createCourse(course));
  
    if (createCourse.fulfilled.match(result)) {
      console.log("Course created:", result.payload);
      setCourse(initialValues)
    } else if (createCourse.rejected.match(result)) {
      console.error("Error creating course:", result.payload);
    }
  };
  

  return (
    <Card className="p-8 m-8">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Image URL"
          name="image"
          value={course.image}
          onChange={handleChange}
        />
        <Input
          label="Title"
          name="title"
          value={course.title}
          onChange={handleChange}
        />
        <Input
          label="Description"
          name="description"
          value={course.description}
          onChange={handleChange}
        />
        <Input
          label="Content"
          name="content"
          value={course.content}
          onChange={handleChange}
        />
        <Input
          label="Duration"
          name="duration"
          value={course.duration}
          onChange={handleChange}
        />
        <Input
          label="Price"
          name="price"
          type="number"
          value={course.price}
          onChange={handleChange}
        />
        <Input
          label="Level"
          name="level"
          value={course.level}
          onChange={handleChange}
        />
        <Input
          label="Category"
          name="category"
          value={course.category}
          onChange={handleChange}
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPaid"
            checked={course.isPaid}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="isPaid">Is Paid</label>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Modules</h3>
        {course.modules.map((module, index) => (
          <ModuleForm
            key={index}
            module={module}
            onChange={(updatedModule) => updateModule(index, updatedModule)}
            onRemove={() => removeModule(index)}
          />
        ))}
        <Button variant="secondary" onClick={addModule} className="mt-2">
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
