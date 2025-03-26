import React from "react";
import { useDispatch } from "react-redux";
import { removeCourse } from "../../redux/features/CartSlice";

const CartItem = ({ course }) => {
    const dispatch = useDispatch();

    return (
        <div className="group flex flex-col md:flex-row items-start justify-between p-4 border-b hover:bg-gray-50 transition-all duration-300 ease-in-out">
            {/* Course Image */}
            <div className="w-full md:w-48 h-32 flex-shrink-0 mb-4 md:mb-0">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                />
            </div>

            {/* Course Details */}
            <div className="flex-1 md:ml-6 w-full">
                <h4 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                    {course.title}
                </h4>
                
                {/* Instructor Name (Fix Applied) */}
                <p className="text-sm text-gray-600 mt-1">
                    By {course.instructor?.name || "Unknown"}
                </p>

                {/* Ratings (Fix Applied) */}
                <div className="flex items-center mt-2">
                    <span className="text-sm text-yellow-600">Bestseller</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                        {course.ratings?.[0] || "No Ratings"} ⭐ ({course.students?.length || 0} students)
                    </span>
                </div>

                {/* Course Details */}
                <div className="text-sm text-gray-600 mt-1">
                    {course.duration} • {course.chapters} chapters • {course.level}
                </div>

                {/* Actions */}
                <div className="mt-3 flex space-x-4">
                    <button
                        onClick={() => dispatch(removeCourse(course._id))}
                        className="text-sm text-red-500 hover:text-red-700 hover:underline"
                    >
                        Remove
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-800 hover:underline">
                        Save for Later
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-800 hover:underline">
                        Move to Wishlist
                    </button>
                </div>
            </div>

            {/* Price */}
            <div className="w-full md:w-24 flex-shrink-0 mt-4 md:mt-0">
                <p className="text-xl font-bold text-gray-900">Rs: {course.price}</p>
            </div>
        </div>
    );
};

export default CartItem;
