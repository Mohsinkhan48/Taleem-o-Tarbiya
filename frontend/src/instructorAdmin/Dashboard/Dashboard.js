import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const handleViewCourses = () => {
    navigate('/instructor/courses');
};
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Dashboard Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h1>
        <button className="bg-[#DB7C26] text-white py-2 px-6 rounded-md shadow-md hover:bg-[#DB7C26] transition-all duration-300">
          View Analytics
        </button>
      </header>

      {/* Dashboard Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Courses */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-gray-700">Total Courses Created</h3>
          <p className="text-2xl text-gray-900 mt-2">20</p>
        </div>

        {/* Enrolled Students */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-gray-700">Enrolled Students</h3>
          <p className="text-2xl text-gray-900 mt-2">350</p>
        </div>

        {/* Total Earnings */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-gray-700">Total Earnings</h3>
          <p className="text-2xl text-gray-900 mt-2">$12,500</p>
        </div>

        {/* Course Completion */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-gray-700">Course Completion Rate</h3>
          <p className="text-2xl text-gray-900 mt-2">85%</p>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-700">Reviews & Average Ratings</h3>
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-900">
            <p className="text-lg">4.5</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-[#DB7C26] text-white py-2 px-4 rounded-full">4.5 ⭐</span>
            <p className="text-sm text-gray-600">From 50 Reviews</p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Course */}
        <Link
          to="/create-course"
          className="bg-[#DB7C26] text-white p-6 rounded-lg shadow-lg hover:bg-[#DB7C26] transform hover:scale-105 transition-all duration-300 flex items-center justify-between"
        >
          <span className="text-xl">Create a New Course</span>
          <span className="text-2xl">+</span>
        </Link>

        {/* View All Courses */}
        <Link
  to="/instructor/courses"
  className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:bg-[#231F20] transform hover:scale-105 transition-all duration-300 flex items-center justify-between"
>
  <span className="text-xl">View All Courses</span>
  <span className="text-2xl">→</span>
</Link>
       

        {/* Access Support/FAQs */}
        <Link
          to="/support"
          className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-between"
        >
          <span className="text-xl">Support / FAQs</span>
          <span className="text-2xl">?</span>
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;
