import React from "react";
import { useNavigate } from "react-router";
import { FaPlayCircle } from "react-icons/fa";
import Card from "../Reusable/Card";
import { BACKEND_URL } from "../../constants/env.constants";
import ImageContainer from "../Reusable/ImageContainer";
import { StudentCourse } from "../../types/student.types";

interface CourseCardProps {
  course: StudentCourse;
}

const StudentCourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/student/courses/${course._id}`);
  };

  return (
    <Card
      className="group relative cursor-pointer rounded-xl overflow-hidden"
      onClick={() => navigate(`/courses/${course._id}`)}
    >
      <div className="relative h-60 md:h-60 w-full">
        <ImageContainer
          src={`${BACKEND_URL}${course.image}`}
          alt={course.title}
          width="w-full"
          height="h-full"
          border={false}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          onClick={handlePlayClick}
        >
          <FaPlayCircle className="text-white text-6xl hover:scale-110 transition-transform duration-200" />
        </div>
      </div>

      {/* Course Info */}
      <div className="p-4 text-text">
        <h3 className="text-xl font-semibold text-primary mb-1">
          {course.title}
        </h3>
        <p className="text-text text-sm mb-2 line-clamp-2">
          {course.description}
        </p>
        <div className="flex justify-between text-sm text-text mb-3">
          <span>Level: {course.level.name}</span>
          <span>Duration: {course.duration}</span>
        </div>

        {/* Progress Bar */}
        {"progress" in course && typeof course.progress === "number" && (
          <div className="w-full">
            <div className="flex justify-between text-xs mb-2">
              <span>Progress</span>
              <span>{Math.round(course.progress)}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2.5">
              <div
                className="bg-success h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StudentCourseCard;
