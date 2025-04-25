import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchStudentCourses } from "../../../redux/slices/fetch/fetchSlices";
import StudentCourseCard from "../../Course/StudentCourseCard";
import { Loader } from "../../../assets/Loader";

const StudentCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector(
    (state: RootState) => state.studentCourses
  );
  console.log(data);
  useEffect(() => {
    dispatch(fetchStudentCourses());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Loader size={30} />
      </div>
    );
  }
  return (
    <div className="p-6">
      <h2 className="text-text text-3xl font-bold mb-6 text-center">
        My Courses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data &&
          data.map((course) => (
            <StudentCourseCard course={course} key={course._id} />
          ))}
      </div>
    </div>
  );
};

export default StudentCourses;
