import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchAllCourses } from "../../../redux/slices/getCoursesSlice";
import { fetchCourseCategories } from "../../../redux/slices/fetch/fetchSlices";
import { Loader } from "../../../assets/Loader";
import FiltersSidebar from "../../Course/FiltersSidebar";
import CourseCard from "../../Course/CourseCard";
import { useLocation } from "react-router";

const ExploreCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCourses, loading } = useSelector((state: RootState) => state.courses);
  const { data: courseCategories } = useSelector((state: RootState) => state.courseCategories);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("categoryId") || "";

  const [filters, setFilters] = useState<Record<string, any>>({
    category: categoryId,
  });

  useEffect(() => {
    // Ensure course categories are available to extract category name
    dispatch(fetchCourseCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categoryId,
    }));
  }, [categoryId]);

  useEffect(() => {
    dispatch(fetchAllCourses(filters));
  }, [dispatch, filters]);

  const categoryName = useMemo(() => {
    const match = courseCategories.find((cat) => cat._id === categoryId);
    return match?.name || "All Categories";
  }, [courseCategories, categoryId]);

  return (
    <div className="bg-background min-h-screen p-4 md:p-12">
      <div className="px-6">
        <h1 className="text-4xl font-bold text-text text-center">Explore Courses</h1>
        <p className="text-center text-text mt-2 mb-8">
          Discover a wide variety of Islamic courses tailored for your learning needs.
        </p>
        <p className="text-center text-text text-lg mb-8">
          Category: <span className="font-semibold">{categoryName}</span>
        </p>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="w-full md:w-1/4">
            <FiltersSidebar
              onApply={(appliedFilters) =>
                setFilters({
                  ...appliedFilters,
                  category: categoryId, // always override with URL category
                })
              }
            />
          </div>

          <div className="w-full md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Loader className="text-text" size={30} />
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
