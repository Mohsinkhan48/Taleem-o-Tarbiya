import React from 'react';
import 'animate.css';
import { FaChalkboardTeacher, FaBookReader } from 'react-icons/fa';  // Importing Font Awesome icons
import { useNavigate } from 'react-router-dom';

const LookingFor = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-light-gray py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primaryColor mb-6 animate__animated animate__fadeInUp">
          What You’re Looking For
        </h2>
        <p className="text-lg text-charcoal-gray opacity-80 mb-12 max-w-4xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
          Whether you're eager to teach or looking to learn, we have the right platform for you. Explore your options below.
        </p>

        {/* Grid layout for "You Want to Teach Here" and "You Want to Learn Here" */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* You Want to Teach Here */}
          <div className="bg-secondaryColor text-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp animate__delay-0.5s">
            <div className="mb-4">
              <FaChalkboardTeacher className="text-5xl text-white mx-auto" /> {/* Teacher Icon */}
            </div>
            <h3 className="text-2xl font-semibold mb-4">You Want to Teach Here</h3>
            <p className="text-lg mb-6">
              Share your knowledge and expertise in Islamic studies with students across the globe. Become an instructor and make an impact.
            </p>
            {/* Button with link to signup */}
            <button 
              onClick={() => navigate('/signup')}
              className="px-6 py-2 border-2 border-white text-white rounded-full transform transition-all duration-300 hover:bg-white hover:text-secondaryColor">
              Apply to Teach
            </button>
          </div>

          {/* You Want to Learn Here */}
          <div className="bg-primaryColor text-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl animate__animated animate__fadeInUp animate__delay-0.5s">
            <div className="mb-4">
              <FaBookReader className="text-5xl text-white mx-auto" /> {/* Reader Icon */}
            </div>
            <h3 className="text-2xl font-semibold mb-4">You Want to Learn Here</h3>
            <p className="text-lg mb-6">
              Join our diverse community of learners and gain in-depth knowledge of Islamic studies at your own pace with expert instructors.
            </p>
            {/* Button with link to signup */}
            <button 
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-white text-sunset-orange rounded-full transform transition-all duration-300 hover:bg-transparent hover:border-2 border-white hover:text-white">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookingFor;
