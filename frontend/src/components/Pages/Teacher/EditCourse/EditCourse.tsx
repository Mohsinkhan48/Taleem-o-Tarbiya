import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppDispatch, RootState } from "../../../../redux/store";
import { fetchCourseById } from "../../../../redux/slices/getCourseByIdSlice";
import Button from "../../../Reusable/Button";
import { Loader } from "../../../../assets/Loader";
import EditThumbnail from "./EditThumbnail";
import EditCourseDetails from "./EditCourseDetails";

const EditCourse: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { singleCourse: course, loading } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    if (id) dispatch(fetchCourseById(id));
  }, [id]);

  const handleManageModules = () => {
    if (id) navigate(`modules`);
  };

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

      {/* Manage Modules Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleManageModules}
          className="bg-primary hover:bg-primary-dark text-white"
        >
          Manage Modules
        </Button>
      </div>
    </div>
  );
};

export default EditCourse;
