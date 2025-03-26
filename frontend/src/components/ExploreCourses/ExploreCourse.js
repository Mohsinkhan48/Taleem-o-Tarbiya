import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'animate.css';
import images from '../../images';
import { Link } from 'react-router-dom';
import {addCourse} from '../../redux/features/CartSlice'

const dummyCourses = [
  { id: 1, title: 'The Fiqh of Fasting and Zakat', time: '3 hr 30 min', price: 30, chapters: 10, modules: 5, rating: 4.5, description: 'The holy month of Ramadan is only a few weeks away, and the blessed time will soon be upon us.', image: images.Ramadan },
        { id: 2, title: 'Al Asma ul Husna The 99 Beautiful Names of Allah', time: '3 hr 45 min', price: 35, chapters: 12, modules: 6, rating: 4.7, description: 'Students will explore the meanings, implications, and practical applications of Allah’s Names, fostering a closer relationship with the Creator. ', image: images.Allah_Names },
        { id: 3, title: 'Seerat un Nabi', time: '4 hr 0 min', price: 40, chapters: 15, modules: 8, rating: 5.0, description: 'Dive deep into the life and teachings of the Prophet Muhammad (PBUH).', image: images.Seerat  },
       
  {
    id: 4,
    title: 'Islamic and Modern Social Thought',
    duration: 4.2,
    modules: 6,
    rating: 4.6,
    popularity: 120,
    price: 39.99,
    image: images.Islamic_Thoughts,
    createdAt: new Date(2025, 0, 8),
  },
  {
    id: 5,
    title: 'History and Principles of Hadith',
    duration: 3.8,
    modules: 5,
    rating: 4.8,
    popularity: 180,
    price: 54.99,
    image: images.History_Principles,
    createdAt: new Date(2025, 0, 12),
  },
  { id: 6, title: 'Tafseer-ul-Quran', time: '5 hr 15 min', price: 45, chapters: 20, modules: 10, rating: 4.8, description: 'Learn the interpretation and deeper meanings of the Holy Quran.', image: images.Allah_Names },
  { id: 7, title: 'Quranic Arabic', time: '4 hr 30 min', price: 40, chapters: 18, modules: 8, rating: 4.6, description: 'Understand the language of the Quran and its linguistic beauty.', image: images.Islamic_Thoughts},
  { id: 8, title: 'Hifz-ul-Quran', time: '6 hr 0 min', price: 50, chapters: 30, modules: 12, rating: 5.0, description: 'Memorization techniques and guidance for becoming a Hafiz of the Quran.', image: images.Seerat },
];

const ExploreCourses = () => {
  const dispatch = useDispatch();
  const cartCourses = useSelector((state) => state.cart.courses);

  const [filters, setFilters] = useState({
    rating: 0,
    duration: 0,
    modules: 0,
    sortBy: 'popularity',
  });

  const [filteredCourses, setFilteredCourses] = useState(dummyCourses);

  useEffect(() => {
    let courses = [...dummyCourses];

    if (filters.rating > 0) {
      courses = courses.filter((course) => course.rating >= filters.rating);
    }
    if (filters.duration > 0) {
      courses = courses.filter((course) => course.duration <= filters.duration);
    }
    if (filters.modules > 0) {
      courses = courses.filter((course) => course.modules >= filters.modules);
    }
    if (filters.sortBy === 'popularity') {
      courses.sort((a, b) => b.popularity - a.popularity);
    } else if (filters.sortBy === 'newest') {
      courses.sort((a, b) => b.createdAt - a.createdAt);
    }

    setFilteredCourses(courses);
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleEnroll = (course) => {
    dispatch(addCourse(course));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center animate__animated animate__fadeInDown">
          Explore Courses
        </h1>
        <p className="text-center text-gray-600 mt-4 mb-12 animate__animated animate__fadeInDown animate__delay-1s">
          Discover a wide variety of Islamic courses tailored for your learning needs.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <input
            type="number"
            placeholder="Min Rating"
            className="border p-2 rounded"
            onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value) || 0)}
          />
          <input
            type="number"
            placeholder="Max Duration"
            className="border p-2 rounded"
            onChange={(e) => handleFilterChange('duration', parseFloat(e.target.value) || 0)}
          />
          <input
            type="number"
            placeholder="Min Modules"
            className="border p-2 rounded"
            onChange={(e) => handleFilterChange('modules', parseInt(e.target.value) || 0)}
          />
          <select
            className="border p-2 rounded"
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="popularity">Most Popular</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 animate__animated animate__fadeInUp">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => {
              const isEnrolled = cartCourses.some((c) => c.id === course.id);
              return (
                <div
                  key={course.id}
                  className="rounded-lg shadow-md bg-white p-4 hover:shadow-lg transition duration-300 cursor-pointer"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
                    <p className="text-gray-600 mt-2">Duration: {course.duration} hrs</p>
                    <p className="text-gray-800 font-bold mt-2">Price: ${course.price}</p>
                    <button
                      onClick={() => handleEnroll(course)}
                      className={`mt-4 w-full py-2 rounded-lg text-white transition-all duration-300 ${isEnrolled ? 'bg-secondaryColor hover:bg-secondaryColor/70' : 'bg-primaryColor hover:bg-primaryColor/70'}`}
                    >
                      {isEnrolled ? <Link to="/my-cart">Go to Cart</Link> : 'Enroll'}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600">No courses match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
