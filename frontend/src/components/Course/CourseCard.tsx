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
      className="overflow-hidden rounded-lg p-0 flex flex-col h-full"
      onClick={onClick}
    >
      {/* Image at the top */}
      <div className="w-full h-48">
        <ImageContainer
          src={`${BACKEND_URL}${course.image}`}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content below image */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-primary font-bold text-xl mb-1">
            {course.title}
          </h2>
          <p className="text-text text-base mb-2 line-clamp-2">
            {course.description}
          </p>
        </div>

        <div className="mt-auto flex justify-between items-end">
          <div>
            <p className="text-sm text-text">Level: {course.level.name}</p>
            <p className="text-sm text-text">Duration: {course.duration}</p>
            <p className="text-sm font-semibold text-secondary">
              Price: ${course.price} (
              {(course.price * 280).toLocaleString("en-PK")} PKR)
            </p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Button
              variant="primary"
              className="text-sm"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/course/${course._id}`);
              }}
            >
              View Details
            </Button>
            <AddToCartButton courseId={course._id} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
