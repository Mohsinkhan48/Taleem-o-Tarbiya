import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import CourseCard from "../../Course/CourseCard";
import { fetchInstructorCourses } from "../../../redux/slices/getCoursesSlice";

const TeacherCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCourses, loading, error } = useSelector(
    (state: RootState) => state.courses
  );

  useEffect(() => {
    dispatch(fetchInstructorCourses());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-text text-3xl font-bold mb-6 text-center">
        My Courses
      </h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

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
