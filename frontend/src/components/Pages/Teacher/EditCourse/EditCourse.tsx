import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch, RootState } from "../../../../redux/store";
import { fetchCourseById } from "../../../../redux/slices/getCourseByIdSlice";
import Button from "../../../Reusable/Button";
import ModuleAccordion from "./ModuleAccordian";
import { Loader } from "../../../../assets/Loader";
import EditThumbnail from "./EditThumbnail";
import EditCourseDetails from "./EditCourseDetails";

const EditCourse: React.FC = () => {
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
      <div className="flex justify-between items-center gap-4">
        <EditCourseDetails
          course={course}
          onSubmit={() => {
            if (id) dispatch(fetchCourseById(id));
          }}
        />
        <EditThumbnail course={course} />
      </div>

      {/* Modules */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Modules</h2>
          <Button variant="secondary">Add Module</Button>
        </div>

        <ModuleAccordion modules={course.modules} />
      </div>
    </div>
  );
};

export default EditCourse;
