import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import CourseCard from "../../Course/CourseCard";
import { fetchAllCourses } from "../../../redux/slices/getCoursesSlice";
import { Loader } from "../../../assets/Loader";
import FiltersSidebar from "../../Course/FiltersSidebar";

const ExploreCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCourses, loading } = useSelector(
    (state: RootState) => state.courses
  );
  const [filters, setFilters] = useState<Record<string, string | undefined>>(
    {}
  );

  useEffect(() => {
    dispatch(fetchAllCourses(filters));
  }, [dispatch, filters]);

  return (
    <div className="bg-background min-h-screen p-4 md:p-12">
      <div className="px-6">
        <h1 className="text-4xl font-bold text-text text-center">
          Explore Courses
        </h1>
        <p className="text-center text-text mt-4 mb-8">
          Discover a wide variety of Islamic courses tailored for your learning
          needs.
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="w-full md:w-1/4">
            <FiltersSidebar
              onApply={(filters) =>
                setFilters(
                  filters as unknown as Record<string, string | undefined>
                )
              }
            />
          </div>

          <div className="w-full md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Loader size={30} />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {allCourses.length > 0 ? (
                  allCourses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))
                ) : (
                  <p className="text-center text-text">No courses available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
