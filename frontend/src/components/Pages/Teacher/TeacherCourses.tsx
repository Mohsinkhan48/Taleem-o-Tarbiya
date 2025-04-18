import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { SERVER_URL } from '../../../constants/env.constants';
import { fetchInstructorCourses } from '../../../redux/slices/GetCoursesSlice';

const TeacherCourses = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { allCourses, loading, error } = useSelector((state: RootState) => state.courses);

    useEffect(() => {
        dispatch(fetchInstructorCourses());
    }, [dispatch]);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-center">My Courses</h2>

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">Error: {error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {allCourses && allCourses.map(course => (
                    <div key={course._id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <img 
                            src={`${SERVER_URL}${course.image}`}
                            alt={course.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                            <p className="text-gray-700 font-medium mb-1">Duration: {course.duration}</p>
                            <p className="text-green-600 font-bold">Price: ${course.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherCourses;
