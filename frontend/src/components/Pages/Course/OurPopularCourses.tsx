import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchAllCourses } from "../../../redux/slices/getCoursesSlice";
import { Course } from "../../../types/course.types";
import Carousel from "../../Reusable/Carousel";
import CourseCard from "../../Course/CourseCard";

interface OurPopularCoursesProps {
  secondHeading: string;
  heading: string;
}

const OurPopularCourses: React.FC<OurPopularCoursesProps> = ({
  secondHeading,
  heading,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const allCourses = useSelector(
    (state: RootState) => state.courses.allCourses
  );

  useEffect(() => {
    dispatch(fetchAllCourses({}));
  }, [dispatch]);

  return (
    <section className="bg-background py-24 px-10">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-primary mb-6">
          {secondHeading} {heading}
        </h2>
        <p className="text-lg text-text opacity-80 mb-12 max-w-4xl mx-auto">
          Explore our wide range of courses tailored for students of all levels.
        </p>

        {allCourses && allCourses.length > 0 ? (
          <Carousel itemsToShow={3}>
            {allCourses.map((course: Course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </Carousel>
        ) : (
          <p className="text-lg text-gray-600">No courses available.</p>
        )}
      </div>
    </section>
  );
};

export default OurPopularCourses;
