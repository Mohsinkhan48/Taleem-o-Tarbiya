import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import CourseCard from "../../Course/CourseCard";
import { fetchAllCourses } from "../../../redux/slices/getCoursesSlice";
import { Loader } from "../../../assets/Loader";

const ExploreCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCourses, loading } = useSelector(
    (state: RootState) => state.courses
  );

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-text text-center">
          Explore Courses
        </h1>
        <p className="text-center text-text mt-4 mb-12">
          Discover a wide variety of Islamic courses tailored for your learning
          needs.
        </p>

        {loading ? (
          <div className="flex justify-center items-center">
            <Loader size={30} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {allCourses.length > 0 ? (
              allCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  onClick={() => {}}
                />
              ))
            ) : (
              <p className="text-center text-text">No courses available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreCourses;
