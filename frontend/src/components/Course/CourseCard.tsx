import React from "react";
import { Course } from "../../types/course.types";
import Card from "../Reusable/Card";
import Button from "../Reusable/Button";
import { useNavigate } from "react-router";
import AddToCartButton from "../Cart/AddToCartButton";
import { BACKEND_URL } from "../../constants/env.constants";
import ImageContainer from "../Reusable/ImageContainer";

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="overflow-hidden rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 h-64"
      onClick={onClick}
    >
      {/* Course details */}
      <div className="flex-1 px-2 py-2 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-primary font-bold text-xl mb-2">
            {course.title}
          </h2>
          <p className="text-text text-base mb-2 line-clamp-2">
            {course.description}
          </p>
        </div>
        <div className="flex justify-between">
          <div>
          <p className="text-sm text-text">Level: {course.level.name}</p>
          <p className="text-sm text-text">Duration: {course.duration}</p>
          <p className="text-sm font-semibold text-secondary mb-2">
            Price: ${course.price}
          </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="primary"
              className="text-sm"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              View Details
            </Button>
            <AddToCartButton courseId={course._id} />
          </div>
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

export default CourseCard;
