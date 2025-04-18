// components/CourseDetails/CourseModulesWrapper.jsx
import { useParams } from "react-router";
import CourseContent from "./CourseContent";

const CourseModulesWrapper = () => {
  const { courseId } = useParams();

  return <CourseContent courseId={courseId} />;
};

export default CourseModulesWrapper;
