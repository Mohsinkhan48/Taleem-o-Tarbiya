import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../../../redux/slices/CourseSlice";
import { AppDispatch, RootState } from "../../../redux/store";

const ExploreCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allCourses } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-text text-center animate__animated animate__fadeInDown">
          Explore Courses
        </h1>
        <p className="text-center text-text mt-4 mb-12 animate__animated animate__fadeInDown animate__delay-1s">
          Discover a wide variety of Islamic courses tailored for your learning
          needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 animate__animated animate__fadeInUp">
          {allCourses.length > 0 ? (
            allCourses.map((course) => {
              return (
                <div
                  key={course._id}
                  className="rounded-lg shadow-md bg-card p-4 hover:shadow-lg transition duration-300 cursor-pointer"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold text-text">
                      {course.title}
                    </h2>
                    <p className="text-text mt-2">
                      Duration: {course.duration} hrs
                    </p>
                    <p className="text-text font-bold mt-2">
                      Price: ${course.price}
                    </p>
                    <button
                      className={`mt-4 w-full py-2 rounded-lg text-button-text transition-all duration-300 bg-button-primary hover:bg-button-primary/70}`}
                    >
                        Enroll
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-text">
              No courses available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
