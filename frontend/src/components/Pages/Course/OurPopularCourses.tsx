import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch, RootState } from '../../../redux/store';
import { Course, fetchAllCourses } from '../../../redux/slices/CourseSlice';

interface OurPopularCoursesProps {
  secondHeading: string;
  heading: string;
}

const OurPopularCourses: React.FC<OurPopularCoursesProps> = ({ secondHeading, heading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const allCourses = useSelector((state: RootState) => state.course.allCourses);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary mb-6 animate__fadeInUp">
          {secondHeading} {heading}
        </h2>
        <p className="text-lg text-text opacity-80 mb-12 max-w-4xl mx-auto animate__fadeInUp animate__delay-1s">
          Explore our wide range of courses tailored for students of all levels, offering in-depth knowledge on various topics.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {allCourses && allCourses.length > 0 ? (
            allCourses.map((course: Course) => (
              <div
                key={course._id}
                onClick={() => handleCourseClick(course._id)}
                className="rounded-xl shadow-md overflow-hidden bg-card cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={`${course.image}`}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-secondary">{course.title}</h3>
                  <p className="text-sm text-gray-700 mt-2">{course.content}</p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Duration:</span> {course.duration}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button className="bg-button-primary text-button-text px-3 py-2 rounded-lg text-sm font-semibold hover:bg-button-hover-primary">
                      Enroll Now
                    </button>
                    <span className="text-sm font-semibold text-primary">${course.price}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-600">No courses available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurPopularCourses;
