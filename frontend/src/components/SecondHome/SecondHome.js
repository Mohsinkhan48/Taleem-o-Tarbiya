import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OurPopularCourses from "../OurPopularCourses/OurPopularCourses";
import { fetchAllCourses } from "../../redux/features/CourseSlice";

const SecondHome = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const dispatch = useDispatch();

  // Fetching course data from Redux state
  const { allCourses: courseData, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchAllCourses());

    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, [dispatch]);

  return (
    <>
      {/* Welcome Back Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white py-10 px-5 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl md:text-5xl font-bold animate-pulse">
          Welcome Back, {loggedInUser || "User"}! 👋
        </h1>
        <p className="mt-2 text-lg md:text-xl text-gray-200">
          We're glad to see you again. Continue your learning journey today!
        </p>
      </div>

      {/* Our Popular Courses Section */}
      <OurPopularCourses secondHeading="What to Learn Next" />

      {/* Loader & Error Handling */}
      <section className="mt-12 mb-12 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Top Picks for You</h2>

        {loading && (
          <p className="text-center text-gray-600 text-lg font-semibold">Loading courses...</p>
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
            courseData.map((course) => (
              <div
                key={course._id}
                className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                {/* Course Image */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full md:w-1/2 h-64 object-cover"
                />

                {/* Course Content */}
                <div className="p-6 flex flex-col justify-center md:w-1/2">
                  <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
                  <p className="text-gray-700 mt-2">{course.content}</p>
                  <div className="mt-4 text-gray-600">
                    <p>
                      <span className="font-semibold">Duration:</span> {course.duration}
                    </p>
                    <p>
                      <span className="font-semibold">Category:</span> {course.category}
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
