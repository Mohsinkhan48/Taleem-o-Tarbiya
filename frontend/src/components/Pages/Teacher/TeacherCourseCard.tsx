import React, { useState } from "react";
import { useNavigate } from "react-router";
import Card from "../../Reusable/Card";
import DropdownMenu from "../../Reusable/DropdownMenu";
import DropdownItem from "../../Reusable/DropdownItem";
import ImageContainer from "../../Reusable/ImageContainer";
import { BACKEND_URL } from "../../../constants/env.constants";
import { Course } from "../../../types/course.types";
import Modal from "../../Reusable/Modal";
import Button from "../../Reusable/Button";
import { TeacherService } from "../../../service/teacherService";

interface TeacherCourseCardProps {
  course: Course;
  onClick?: () => void;
  onPublish?: (courseId: string) => void;
}

const TeacherCourseCard: React.FC<TeacherCourseCardProps> = ({
  course,
  onClick,
  onPublish
}) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickPublish = () => {
    setModal(true);
  };
  return (
    <Card
      className="overflow-hidden rounded-lg flex flex-col items-center gap-2 h-full w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={onClick}
    >
      {/* Image at the top */}
      <div className="w-full h-48 rounded-t-lg overflow-hidden">
        <ImageContainer
          src={`${BACKEND_URL}${course.image}`}
          alt={course.title}
          width="w-full"
          height="h-full"
          className="object-cover"
        />
      </div>

      {/* Course Details */}
      <div className="flex-1 w-full flex flex-col justify-between px-4 py-2">
        <h2 className="text-primary font-bold text-2xl mb-2 line-clamp-1">
          {course.title}
        </h2>

        <p className="text-text text-base mb-2 line-clamp-2">
          {course.description}
        </p>

        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-text">Level: {course.level.name}</p>
          <p className="text-sm text-text">Duration: {course.duration}</p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-secondary">
              Price: ${course.price} (
              {(course.price * 280).toLocaleString("en-PK")} PKR)
            </p>

            <p
              className={`text-sm font-semibold ${
                course.isPublished ? "text-success" : "text-warning"
              }`}
            >
              {course.isPublished ? "Published" : "Draft"}
            </p>
          </div>

          {/* Dropdown Actions */}
          <DropdownMenu
            button={
              <div className="flex items-center gap-2 px-4 py-2 bg-card border border-card-border rounded-md cursor-pointer hover:bg-card-hover">
                Manage
              </div>
            }
          >
            <div className="bg-card border border-card-border rounded-md p-1">
              <DropdownItem
                onClick={() => navigate(`/teacher/edit-course/${course._id}`)}
                className="text-text hover:text-primary"
              >
                Edit Course
              </DropdownItem>
              <DropdownItem
                onClick={() => navigate(`/course/${course._id}`)}
                className="text-text hover:text-primary"
              >
                View as Student
              </DropdownItem>
              <DropdownItem
                onClick={() =>
                  navigate(`/teacher/manage-lectures/${course._id}`)
                }
                className="text-text hover:text-primary"
              >
                Manage Lectures
              </DropdownItem>
              {!course.isPublished && (
                <DropdownItem
                  onClick={onClickPublish}
                  className="text-text hover:text-primary"
                >
                  Publish
                </DropdownItem>
              )}
            </div>
          </DropdownMenu>
        </div>
      </div>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <div className="p-6">
          <p className="text-xl font-semibold text-text mb-4">
            Are you sure you want to publish this course?
          </p>

          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => setModal(false)}>
              Cancel
            </Button>

            <Button
              variant="primary"
              isLoading={loading}
              onClick={async () => {
                setLoading(true)
                try {
                  const response = await TeacherService.publishCourse(
                    course._id!
                  );
                  setLoading(false)
                  if(response) {
                    onPublish?.(course._id)
                    setModal(false)
                  }
                } catch (err) {
                  console.log(err)
                  console.log("In catch")
                  alert("Failed to publish course");
                }
              }}
            >
              Publish
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default TeacherCourseCard;
