// components/Course/CourseDetail.tsx
import React from "react";
import { Course } from "../../types/course.types";
import RatingStars from "./RatingStars";
import ModuleCard from "./ModuleCard";
import Button from "../Reusable/Button";
import CourseIncludes from "./CourseIncludes";
import AddToCartButton from "../Cart/AddToCartButton";
import { timeAgo } from "../../utils/dateFormat";

interface CourseDetailProps {
  course: Course;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
  const total_quizes = course.modules.reduce((quizCount, module) => {
    return (
      quizCount +
      module.chapters.reduce(
        (count, chapter) => (chapter.quiz ? count + 1 : count),
        0
      )
    );
  }, 0);

  const total_assignments = course.modules.reduce((assignmentCount, module) => {
    return (
      assignmentCount +
      module.chapters.reduce(
        (count, chapter) => (chapter.assignment ? count + 1 : count),
        0
      )
    );
  }, 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-4xl font-bold mb-1 text-text">{course.title}</h1>
        <AddToCartButton courseId={course._id}/>
      </div>
      {course.instructor && (
        <div className="flex items-center mb-4">
          <p className="text-md text-text">Created by</p>
          <Button variant="link">{course.instructor.fullName}</Button>
        </div>
      )}
      <img
        className="w-full max-h-[350px] object-cover rounded mb-6"
        src={course.image}
        alt={course.title}
      />

      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <RatingStars ratings={course.ratings} />
        <p className="text-sm text-text">
          Last Updated:{" "}
          <span className="font-medium">{timeAgo(course.updatedAt)}</span>
        </p>
      </div>
      <CourseIncludes
        courseSummary={{
          total_quizes,
          total_assignments,
          duration: course.duration || "Self-paced",
        }}
      />
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-text">
          What You Will Learn
        </h2>
        <p className="text-text">{course.content}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-text">Modules</h2>
        <div className="bg-card border border-card-border rounded-lg">
          {course.modules.length > 0 ? (
            course.modules.map((module) => (
              <ModuleCard key={module._id} module={module} />
            ))
          ) : (
            <p
              className={`p-4 cursor-pointer flex justify-between items-center`}
            >
              No modules available.
            </p>
          )}
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-1 text-text">Description</h2>
      <p className="text-lg text-text mb-6">{course.description}</p>
    </div>
  );
};

export default CourseDetail;
