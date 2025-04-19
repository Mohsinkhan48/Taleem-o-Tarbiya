import React from "react";
import { Course } from "../../types/course.types";
import Card from "../Reusable/Card";
import Button from "../Reusable/Button";
import { useNavigate } from "react-router";
import AddToCartButton from "../Cart/AddToCartButton";

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="overflow-hidden rounded-lg p-2 flex flex-col md:flex-row-reverse items-center gap-4"
      onClick={onClick}
    >
      {/* Image on right side */}
      <img
        className="w-full md:w-1/3 h-48 md:h-full object-cover rounded-lg"
        src={course.image}
        alt={course.title}
      />

      {/* Course details on left */}
      <div className="flex-1 px-2 py-2">
        <h2 className="text-primary font-bold text-xl mb-2">{course.title}</h2>
        <p className="text-text text-base mb-2 line-clamp-3">{course.description}</p>
        <p className="text-sm text-text">Level: {course.level}</p>
        <p className="text-sm text-text">Duration: {course.duration}</p>
        <p className="text-sm font-semibold text-secondary mb-2">
          Price: ${course.price}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            className="text-sm"
            onClick={() => navigate(`/course/${course._id}`)}
          >
            View Details
          </Button>
          <AddToCartButton courseId={course._id}/>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
