import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../images';
import 'animate.css';
import { setAllCourses } from '../../store/CourseSlice';

const OurPopularCourses = ({ secondHeading, heading }) => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allCourses = useSelector(state => state.course.allCourses);

  const courseData = [
    {
      tab: 'Ramadan Courses',
      courses: [
        { id: 1, title: 'The Fiqh of Fasting and Zakat', time: '3 hr 30 min', price: 30, chapters: 10, modules: 5, rating: 4.5, description: 'The holy month of Ramadan is only a few weeks away, and the blessed time will soon be upon us.', image: images.Ramadan },
        { id: 2, title: 'Al Asma ul Husna The 99 Beautiful Names of Allah', time: '3 hr 45 min', price: 35, chapters: 12, modules: 6, rating: 4.7, description: 'Students will explore the meanings, implications, and practical applications of Allah’s Names, fostering a closer relationship with the Creator. ', image: images.Allah_Names },
        { id: 3, title: 'Seerat un Nabi', time: '4 hr 0 min', price: 40, chapters: 15, modules: 8, rating: 5.0, description: 'Dive deep into the life and teachings of the Prophet Muhammad (PBUH).', image: images.Seerat  },
      ],
    },
    {
      tab: 'Quranic Studies',
      courses: [
        { id: 4, title: 'Tafseer-ul-Quran', time: '5 hr 15 min', price: 45, chapters: 20, modules: 10, rating: 4.8, description: 'Learn the interpretation and deeper meanings of the Holy Quran.', image: images.Tafseer_ul_Quran },
        { id: 5, title: 'Quranic Arabic', time: '4 hr 30 min', price: 40, chapters: 18, modules: 8, rating: 4.6, description: 'Understand the language of the Quran and its linguistic beauty.', image: images.Quranic_Arabic },
        { id: 6, title: 'Hifz-ul-Quran', time: '6 hr 0 min', price: 50, chapters: 30, modules: 12, rating: 5.0, description: 'Memorization techniques and guidance for becoming a Hafiz of the Quran.', image: images.Hifz_ul_Quran },
      ],
    },
  ];

  useEffect(() => {
    if (allCourses.length === 0) {
      dispatch(setAllCourses(courseData.flatMap(tab => tab.courses)));
    }
  }, [dispatch, allCourses]);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <section className="bg-bright-white py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primaryColor mb-6 animate__animated animate__fadeInUp">
          {secondHeading} {heading}
        </h2>
        <p className="text-lg text-charcoal-gray opacity-80 mb-12 max-w-4xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Explore our wide range of courses tailored for students of all levels, offering in-depth knowledge on various Islamic topics.
        </p>

        <div className="tabs mb-10">
          <ul className="flex justify-center space-x-6">
            {courseData.map((tab, index) => (
              <li
                key={index}
                className={`cursor-pointer text-lg font-semibold ${
                  activeTab === index ? 'text-secondaryColor' : 'text-textColor'
                } hover:text-secondaryColor/80 transition duration-300 hover:scale-110 transform`}
                onClick={() => setActiveTab(index)}
              >
                {tab.tab}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courseData[activeTab].courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              className="animate__animated animate__fadeInUp rounded-xl shadow-md overflow-hidden bg-white cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 hover:scale-110"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-secondaryColor">{course.title}</h3>
                <p className="text-sm text-gray-700 mt-2">{course.description}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Duration:</span> {course.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Chapters:</span> {course.chapters}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Modules:</span> {course.modules}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    className="bg-primaryColor text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700"
                  >
                    Enroll Now
                  </button>
                  <span className="text-sm font-semibold text-primaryColor">${course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPopularCourses;
