import React from "react";
import { useNavigate } from "react-router";
import Card from "../../Reusable/Card";
import DropdownMenu from "../../Reusable/DropdownMenu";
import DropdownItem from "../../Reusable/DropdownItem";
import ImageContainer from "../../Reusable/ImageContainer";
import { BACKEND_URL } from "../../../constants/env.constants";
import { Course } from "../../../types/course.types";

interface TeacherCourseCardProps {
  course: Course;
  onClick?: () => void;
  onTogglePublish?: (courseId: string) => void; // optional publish toggle
}

const TeacherCourseCard: React.FC<TeacherCourseCardProps> = ({
  course,
  onClick,
  onTogglePublish,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      className="overflow-hidden rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 h-64"
      onClick={onClick}
    >
      {/* Course Details */}
      <div className="flex-1 px-2 py-2 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h2 className="text-primary font-bold text-xl mb-2">
            {course.title}
          </h2>
        </div>

        <p className="text-text text-base mb-2 line-clamp-2">
          {course.description}
        </p>
        <p className="text-sm text-text">Level: {course.level.name}</p>
        <p className="text-sm text-text">Duration: {course.duration}</p>
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-semibold text-secondary mb-2">
              Price: ${course.price}
            </p>
            <p
              className={`text-sm font-semibold ${
                course.isPublished ? "text-green-500" : "text-yellow-500"
              }`}
            >
              {course.isPublished ? "Published" : "Draft"}
            </p>
          </div>
          {/* Dropdown Actions */}
          <DropdownMenu
            button={
              <div className="flex items-center gap-2 px-3 py-2 bg-card border border-card-border rounded-md">
                Manage
              </div>
            }
          >
            <div className="bg-card border border-card-border rounded-md p-1">
              <DropdownItem
                onClick={() => navigate(`/teacher/courses/${course._id}`)}
                className="text-text"
              >
                Edit Course
              </DropdownItem>
              <DropdownItem
                onClick={() => navigate(`/course/${course._id}`)}
                className="text-text"
              >
                View as Student
              </DropdownItem>
              {!course.isPublished && (
                <DropdownItem
                  onClick={() => onTogglePublish?.(course._id)}
                  className="text-text"
                >
                  Publish
                </DropdownItem>
              )}
            </div>
          </DropdownMenu>
        </div>
      </div>

      {/* Image Container */}
      <ImageContainer
        src={`${BACKEND_URL}${course.image}`}
        alt={course.title}
        width="w-1/3"
        height="h-full"
      />
    </Card>
  );
};

export default TeacherCourseCard;
