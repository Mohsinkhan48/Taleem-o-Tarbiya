import React, { useState } from 'react';
import 'animate.css';
import images from '../../images';

const dummyCourses = [
  {
    id: 1,
    title: 'Dawa o Irshad',
    duration: 3.5,
    modules: 3,
    rating: 4.5,
    popularity: 100,
    image: images.Dawa_o_Irshad,
    createdAt: new Date(2025, 0, 5),
  },
  {
    id: 2,
    title: 'Islamic History',
    duration: 3.75,
    modules: 4,
    rating: 4.7,
    popularity: 150,
    image: images.Islamic_History,
    createdAt: new Date(2025, 0, 10),
  },
  {
    id: 3,
    title: 'Seerat un Nabi',
    duration: 4.0,
    modules: 5,
    rating: 5.0,
    popularity: 200,
    image: images.seerat_un_nabwi,
    createdAt: new Date(2025, 0, 15),
  },
  {
    id: 4,
    title: 'Islamic and Modern Social Thought',
    duration: 4.2,
    modules: 6,
    rating: 4.6,
    popularity: 120,
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
    image: images.History_Principles,
    createdAt: new Date(2025, 0, 12),
  },
];

const ExploreCourses = () => {
  const [filters, setFilters] = useState({
    rating: 0,
    duration: 0,
    modules: 0,
    sortBy: 'popularity',
  });

  const [filteredCourses, setFilteredCourses] = useState(dummyCourses);

  const applyFilters = () => {
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
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
    applyFilters();
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

        {/* Filters Section */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 animate__animated animate__fadeInUp">
          <div>
            <label className="block text-gray-600 mb-2">Rating:</label>
            <select
              className="border border-gray-300 rounded px-4 py-2"
              onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
            >
              <option value="0">All Ratings</option>
              <option value="4.0">4.0+</option>
              <option value="4.5">4.5+</option>
              <option value="5.0">5.0</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Duration (hours):</label>
            <input
              type="number"
              className="border border-gray-300 rounded px-4 py-2"
              placeholder="Max Duration"
              onChange={(e) => handleFilterChange('duration', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Modules:</label>
            <input
              type="number"
              className="border border-gray-300 rounded px-4 py-2"
              placeholder="Min Modules"
              onChange={(e) => handleFilterChange('modules', parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Sort By:</label>
            <select
              className="border border-gray-300 rounded px-4 py-2"
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="popularity">Most Popular</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 animate__animated animate__fadeInUp">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
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
                  <p className="text-gray-600 mt-2">
                    Duration: <span className="font-medium">{course.duration} hrs</span>
                  </p>
                  <p className="text-gray-600">
                    Modules: <span className="font-medium">{course.modules}</span>
                  </p>
                  <p className="text-gray-600">
                    Rating: <span className="font-medium">{course.rating} &#9733;</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreCourses;
