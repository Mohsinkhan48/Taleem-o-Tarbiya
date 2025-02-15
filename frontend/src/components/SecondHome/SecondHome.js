import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../../utils';
import { ToastContainer } from 'react-toastify';
import OurPopularCourses from '../OurPopularCourses/OurPopularCourses';

const SecondHome = () => {
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  // Dummy Islamic Courses Data
  const islamicCourses = [
    {
      id: 1,
      title: 'Tafsir-ul-Quran',
      description: 'A deep dive into the meanings of the Holy Quran with authentic Tafsir.',
      image: 'https://images.unsplash.com/photo-1570206916435-745fc43bb9c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXNsYW1pYyUyMGNvdXJzZXN8ZW58MHx8MHx8fDA%3D',
      time: '12 Weeks',
      chapters: 10,
      modules: 5,
      rating: 4.8,
      price: 'Free',
    },
    {
      id: 2,
      title: 'Hadith Studies',
      description: 'Learn about the authentic Hadiths and their significance in daily life.',
    
      image: 'https://images.unsplash.com/photo-1511652019870-fbd8713560bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGlzbGFtaWN8ZW58MHx8MHx8fDA%3D', // Dummy Image
      time: '8 Weeks',
      chapters: 8,
      modules: 4,
      rating: 4.7,
      price: 'Free',
    },
  ];

  return (
    <>
      {/* Welcome Back Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white py-10 px-5 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl md:text-5xl font-bold animate-pulse">
          Welcome Back, {loggedInUser || 'User'}! 👋
        </h1>
        <p className="mt-2 text-lg md:text-xl text-gray-200">
          We're glad to see you again. Continue your learning journey today!
        </p>
      </div>

      {/* Our Popular Courses Section */}
      <OurPopularCourses secondHeading="What to Learn Next" />

      {/* Our Top Picks for You - Islamic Courses */}
      <section className="mt-12 mb-12 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Our Top Picks for You
        </h2>
        <div className="space-y-8">
          {islamicCourses.map((course) => (
            <div
              key={course.id}
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
                <p className="text-gray-700 mt-2">{course.description}</p>
                <div className="mt-4 text-gray-600">
                  <p><span className="font-semibold">Duration:</span> {course.time}</p>
                  <p><span className="font-semibold">Chapters:</span> {course.chapters}</p>
                  <p><span className="font-semibold">Modules:</span> {course.modules}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-emerald-600">{course.price}</span>
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
