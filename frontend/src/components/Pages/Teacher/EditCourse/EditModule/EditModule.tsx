import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { fetchCourseById } from "../../../../../redux/slices/getCourseByIdSlice";
import { Loader } from "../../../../../assets/Loader";
import ModuleCard from "./ModuleCard";

const EditModule: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { singleCourse: course, loading } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    if (id) dispatch(fetchCourseById(id));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Loader size={30} />
      </div>
    );
  }
  if (!course) {
    return <div className="text-text">No Course Found</div>;
  }
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 text-text">
      <div className="space-y-6">
        {course.modules.map((module)=>{
          return (
            <ModuleCard module={module}/>
          )
        })}
      </div>
    </div>
  );
};

export default EditModule;
