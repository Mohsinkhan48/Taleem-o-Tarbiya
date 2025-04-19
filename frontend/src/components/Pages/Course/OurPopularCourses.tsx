import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchAllCourses } from "../../../redux/slices/getCoursesSlice";
import { Course } from "../../../types/course.types";
import Carousel from "../../Reusable/Carousel";
import AddToCartButton from "../../Cart/AddToCartButton";

interface OurPopularCoursesProps {
  secondHeading: string;
  heading: string;
}

const OurPopularCourses: React.FC<OurPopularCoursesProps> = ({
  secondHeading,
  heading,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const allCourses = useSelector(
    (state: RootState) => state.courses.allCourses
  );

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <section className="bg-background py-24">
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
              <div
                key={course._id}
                onClick={() => handleCourseClick(course._id)}
                className="rounded-lg overflow-hidden bg-card border border-card-border"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-t-xl transition-transform duration-300 hover:scale-110 text-center"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary">
                    {course.title}
                  </h3>
                  <p className="text-sm text-text mt-2">{course.content}</p>
                  <div className="mt-4 text-left text-text">
                    <p className="text-sm">
                      <span className="font-medium">Duration:</span>{" "}
                      {course.duration}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <AddToCartButton courseId={course._id} />
                    <span className="text-sm font-semibold text-primary">
                      ${course.price}
                    </span>
                  </div>
                </div>
              </div>
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
