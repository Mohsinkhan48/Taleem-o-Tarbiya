// CreateCourseForm.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { createCourse } from "../../../../redux/slices/createCourseSlice";
import { updateCourse } from "../../../../redux/slices/updateCourseSlice"; // import your update action
import { fetchCourseById } from "../../../../redux/slices/getCourseByIdSlice";
import { useNavigate, useParams } from "react-router";

import Button from "../../../Reusable/Button";
import Card from "../../../Reusable/Card";
import ImageUpload from "../../../Reusable/ImageUpload";
import CourseDetailsForm, { CourseDetails } from "./CourseDetailsForm";
import ModuleForm from "./ModuleForm";
import { Module } from "../../../../types/course.types";
import { uploadThumbnail } from "../../../../redux/slices/uploadThumbnailSlice";

const CreateCourseForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { singleCourse } = useSelector(
    (state: RootState) => state.course
  );
  const { loading: submitting } = useSelector((state: RootState) => state.createCourse);

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

  // Fetch course if id is provided
  useEffect(() => {
    if (id) dispatch(fetchCourseById(id));
  }, [id]);

  // Populate form with existing course
  useEffect(() => {
    if (id && singleCourse) {
      const transformed: CourseDetails = {
        title: singleCourse.title,
        description: singleCourse.description,
        content: singleCourse.content,
        duration: singleCourse.duration,
        price: singleCourse.price,
        level: singleCourse.level._id,
        category: singleCourse.category._id,
        tags: singleCourse.tags.map((tag)=> tag._id),
        isPaid: singleCourse.isPaid,
        modules: singleCourse.modules,
      };
  
      setCourse(transformed);
      setThumbnail(singleCourse.image);
    }
  }, [id, singleCourse]);
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? (target as HTMLInputElement).checked : undefined;

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
      modules: [...prev.modules, { title: "", chapters: [] }],
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
    const action = id
      ? updateCourse({ ...course, courseId: id }) // assuming updateCourse accepts an object with id and updated course
      : createCourse(course);

    const result = await dispatch(action);

    if ((id && updateCourse.fulfilled.match(result)) || (!id && createCourse.fulfilled.match(result))) {
      const courseId = result.payload._id;

      if (thumbnail && typeof thumbnail !== "string") {
        await dispatch(uploadThumbnail({ courseId, file: thumbnail }));
      }

      navigate("/courses"); // or wherever you'd like to go after save
    } else {
      console.error("Error saving course:", result.payload);
    }
  };

  return (
    <Card className="rounded-lg p-8 m-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {id ? "Update Course" : "Create New Course"}
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side */}
        <div className="flex-1">
          <CourseDetailsForm
            course={course}
            handleChange={handleChange}
            handleChangeContent={handleChangeContent}
            setTags={(tags) => setCourse((prev) => ({ ...prev, tags }))}
          />

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
            <Button variant="primary" onClick={handleSubmit} isLoading={submitting}>
              {id ? "Update Course" : "Submit Course"}
            </Button>
          </div>
        </div>

        {/* Right side */}
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
