import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import 'animate.css';
import images from '../../images';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval); 
  }, []);
  

  return (
    <section className="relative bg-gradient-to-r from-emerald-green to-sunset-orange py-24">
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${images.main3})` }}></div>

      <div className="container mx-auto px-6 flex flex-col justify-center items-center text-center space-y-8 z-10">
        <div className="space-y-6 animate__animated animate__fadeIn">
          <h1 className="text-5xl font-bold text-bright-white leading-tight max-w-4xl">
            Empower Your Future with Taleem-o-Tarbiya 
          </h1>
          <p className="text-lg text-bright-white opacity-80 max-w-3xl mx-auto">
            Unlock your potential through immersive and accessible Islamic courses and learning resources designed for every level.
          </p>
          <div className="space-x-4">
            <button className="bg-emerald-green text-ivory-white py-2 px-8 rounded-lg shadow-lg hover:bg-emerald-green hover:scale-105 transition-all">
              Start Learning
            </button>
            <Link to="/explore-courses">
              <button className="border-2 border-bright-white text-bright-white py-2 px-8 rounded-lg shadow-lg hover:bg-bright-white hover:text-emerald-green hover:scale-105 transition-all">
                Explore Courses
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
