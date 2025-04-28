import React from "react";
import { Course } from "../../types/course.types";
import RatingStars from "./RatingStars";
import Button from "../Reusable/Button";
import CourseIncludes from "./CourseIncludes";
import AddToCartButton from "../Cart/AddToCartButton";
import { timeAgo } from "../../utils/dateFormat";
import TagList from "./TagList";
import { BACKEND_URL } from "../../constants/env.constants";
import ImageContainer from "../Reusable/ImageContainer";
import ModuleAccordion from "./ModuleAccordian";

interface CourseDetailProps {
  course: Course;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
  const total_quizes = course.modules.reduce(
    (quizCount, module) =>
      quizCount +
      module.chapters.reduce(
        (count, chapter) => (chapter.quiz ? count + 1 : count),
        0
      ),
    0
  );

  const total_assignments = course.modules.reduce(
    (assignmentCount, module) =>
      assignmentCount +
      module.chapters.reduce(
        (count, chapter) => (chapter.assignment ? count + 1 : count),
        0
      ),
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header and Image Section */}
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between gap-6">
        {/* Left: Course Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-4xl font-bold mb-1 text-text">
              {course.title}
            </h1>

            {course.instructor && (
              <div className="flex items-center gap-2">
                <p className="text-md text-text">Created by</p>
                <Button variant="link">{course.instructor.fullName}</Button>
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-card border border-card-border p-4 rounded-lg text-center">
              <p className="text-sm text-primary">Level</p>
              <p className="text-lg font-semibold text-text">
                {course.level.name}
              </p>
            </div>
            <div className="bg-card border border-card-border p-4 rounded-lg text-center">
              <p className="text-sm text-primary">Category</p>
              <p className="text-lg font-semibold text-text">
                {course.category.name}
              </p>
            </div>
          </div>

          {/* Tags */}
          {course.tags.length > 0 && <TagList tags={course.tags} />}

          <RatingStars ratings={course.ratings} />
          <p className="text-sm text-text">
            Last Updated:{" "}
            <span className="font-medium">{timeAgo(course.updatedAt!)}</span>
          </p>
        </div>

        {/* Right: Image + Price */}
        <div className="w-full lg:w-[300px] xl:w-[350px]">
          <div className="border border-card-border rounded-lg bg-card p-4 space-y-4">
            <ImageContainer
              src={`${BACKEND_URL}${course.image}`}
              alt={course.title}
              border={false}
              width="w-full"
              height="max-h-[250px]"
            />
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-2xl font-bold text-text">
                {course.isPaid ? `$${course.price}` : "Free"}
              </p>
              <AddToCartButton courseId={course._id} />
            </div>
          </div>
        </div>
      </div>

      {/* Includes Section */}
      <CourseIncludes
        courseSummary={{
          total_quizes,
          total_assignments,
          duration: course.duration || "Self-paced",
        }}
      />

      {/* What You Will Learn */}
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

      {/* Modules */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-text">Modules</h2>
        <ModuleAccordion modules={course.modules} />
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold mb-1 text-text">Description</h2>
        <p className="text-lg text-text">{course.description}</p>
      </div>
    </div>
  );
};

export default CourseDetail;
