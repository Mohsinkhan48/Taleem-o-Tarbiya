import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import CourseCard from "../../Course/CourseCard";
import { fetchInstructorCourses } from "../../../redux/slices/getCoursesSlice";
import { Loader } from "../../../assets/Loader";

const TeacherCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCourses, loading } = useSelector(
    (state: RootState) => state.courses
  );

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
  return (
    <div>
      <h2 className="text-text text-3xl font-bold mb-6 text-center">
        My Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allCourses &&
          allCourses.map((course) => (
            <CourseCard course={course} key={course._id} />
          ))}
      </div>
    </div>
  );
};

export default TeacherCourses;
