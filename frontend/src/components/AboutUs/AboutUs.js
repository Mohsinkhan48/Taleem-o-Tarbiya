import React from 'react';
import 'animate.css';
import images from '../../images';

const AboutUs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center text-charcoal-gray">
        <h2 className="text-4xl font-bold mb-6 animate__animated animate__fadeInUp">
          About Taleem-o-Tarbiya
        </h2>
        <p className="text-lg opacity-80 mb-12 animate__animated animate__fadeInUp animate__delay-1s">
          Taleem-o-Tarbiya is a revolutionary Learning Management System (LMS) aimed at providing quality Islamic education across all levels. Our mission is to make learning accessible, engaging, and impactful for students and educators worldwide.
        </p>
        <div className="flex flex-wrap justify-center gap-12">
          <div className="w-full sm:w-1/3 p-6 animate__animated animate__fadeInUp animate__delay-2s">
            <div className="bg-light-gray shadow-lg p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-deep-blue mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700">
                We aim to bridge the gap in Islamic education by offering courses for all ages and backgrounds. Our courses are tailored to empower individuals with knowledge and skills for both religious and professional growth.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-1/3 p-6 animate__animated animate__fadeInUp animate__delay-3s">
            <div className="bg-soft-yellow shadow-lg p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-deep-blue mb-4">Our Vision</h3>
              <p className="text-lg text-gray-700">
                We envision a world where quality Islamic education is accessible to everyone, regardless of their geographical location or socio-economic status. Our vision is to create a global community of learners dedicated to lifelong learning.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-1/3 p-6 animate__animated animate__fadeInUp animate__delay-4s">
            <div className="bg-emerald-green shadow-lg p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-bright-white mb-4">Our Core Values</h3>
              <ul className="list-disc list-inside text-lg text-bright-white">
                <li>Integrity in education</li>
                <li>Commitment to excellence</li>
                <li>Inclusivity and accessibility</li>
                <li>Fostering a growth mindset</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 animate__animated animate__fadeInUp animate__delay-5s">
          <h2 className="text-3xl font-semibold mb-8 text-deep-blue">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {/* Team Member 1 */}
            <div className="w-full sm:w-1/4 text-center p-6">
              <img src={images.CEO} alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-charcoal-gray">Mohsin Khan</h4>
              <p className="text-lg text-gray-700">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="w-full sm:w-1/4 text-center p-6">
              <img src={images.Choose_us} alt="Team Member 2" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-charcoal-gray">Hammad</h4>
              <p className="text-lg text-gray-700">Chief Content Officer</p>
            </div>

            {/* Team Member 3 */}
            <div className="w-full sm:w-1/4 text-center p-6">
              <img src={images.Sciences_Quran} alt="Team Member 3" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-charcoal-gray">Syed Uzair Shah</h4>
              <p className="text-lg text-gray-700">Head of Technology</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
