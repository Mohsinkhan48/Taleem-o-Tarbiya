import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OurPopularCourses from "../Course/OurPopularCourses";
import { SERVER_URL } from "../../../constants/env.constants";
import { fetchAllCourses } from "../../../redux/slices/CourseSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { useAuth } from "../../../hooks/useAuth";

interface Course {
  _id: string;
  title: string;
  content: string;
  duration: string;
  category: string;
  price: number;
  image: string;
}

const SecondHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  // Fetching course data from Redux state
  const {
    allCourses: courseData,
    loading,
    error,
  } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (
    <>
      {/* Welcome Back Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white py-10 px-5 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl md:text-5xl font-bold animate-pulse">
          Welcome Back, {user?.fullName || "User"}! 👋
        </h1>
        <p className="mt-2 text-lg md:text-xl text-gray-200">
          We're glad to see you again. Continue your learning journey today!
        </p>
      </div>

      {/* Our Popular Courses Section */}
      <OurPopularCourses heading="" secondHeading="What to Learn Next" />

      {/* Loader & Error Handling */}
      <section className="mt-12 mb-12 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Our Top Picks for You
        </h2>

        {loading && (
          <p className="text-center text-gray-600 text-lg font-semibold">
            Loading courses...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 text-lg font-semibold">
            Error loading courses: {error}
          </p>
        )}

        {!loading && !error && courseData.length === 0 && (
          <p className="text-center text-gray-600 text-lg font-semibold">
            No courses available at the moment.
          </p>
        )}

        {/* Course List */}
        <div className="space-y-8">
          {!loading &&
            !error &&
            courseData.length > 0 &&
            courseData.map((course: Course) => (
              <div
                key={course._id}
                className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                {/* Course Image */}
                <img
                  src={`${SERVER_URL}${course.image}`}
                  alt={course.title}
                  className="w-full md:w-1/2 h-64 object-cover"
                />

                {/* Course Content */}
                <div className="p-6 flex flex-col justify-center md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {course.title}
                  </h3>
                  <p className="text-gray-700 mt-2">{course.content}</p>
                  <div className="mt-4 text-gray-600">
                    <p>
                      <span className="font-semibold">Duration:</span>{" "}
                      {course.duration}
                    </p>
                    <p>
                      <span className="font-semibold">Category:</span>{" "}
                      {course.category}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span>{" "}
                      {course.price === 0 ? "Free" : `$${course.price}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default SecondHome;
