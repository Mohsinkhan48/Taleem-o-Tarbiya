import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchInstructorCourses } from "../../../redux/slices/getCoursesSlice";
import { Loader } from "../../../assets/Loader";
import TeacherCourseCard from "./TeacherCourseCard";
import Modal from "../../Reusable/Modal";
import Button from "../../Reusable/Button";

const TeacherCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCourses, loading } = useSelector(
    (state: RootState) => state.courses
  );
  const [modal, setModal] = useState(false);
  useEffect(() => {
    dispatch(fetchInstructorCourses());
  }, [dispatch]);
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Loader size={30} />
      </div>
    );
  }
  const onClickPublish = () => {
    setModal(true);
  };
  return (
    <div className="p-6">
      <h2 className="text-text text-3xl font-bold mb-6 text-center">
        My Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allCourses &&
          allCourses.map((course) => (
            <TeacherCourseCard
              course={course}
              key={course._id}
              onTogglePublish={onClickPublish}
            />
          ))}
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
              onClick={() => {
                /* Handle publish logic */
              }}
            >
              Publish
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherCourses;
