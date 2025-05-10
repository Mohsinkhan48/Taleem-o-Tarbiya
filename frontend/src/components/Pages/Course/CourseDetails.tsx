import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import CourseDetail from "../../Course/CourseDetail";
import { fetchCourseById } from "../../../redux/slices/getCourseByIdSlice";
import { Loader } from "../../../assets/Loader";

const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCourseById(id!));
  }, []);
  const { singleCourse: courseDetails, loading } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    if (!courseDetails) {
      console.error("Course not found");
    }
  }, [courseDetails]);

  if (!loading && !courseDetails) {
    return (
      <div className="text-center text-red-500 py-10 animate__animated animate__fadeIn">
        Course not found. Please check the course ID.
      </div>
    );
  }
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader className="text-text" size={30}/>
        </div>
      ) : (
        <CourseDetail course={courseDetails!}/>
      )}
    </div>
  );
};

export default CourseDetails;
