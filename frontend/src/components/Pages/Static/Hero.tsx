import { Link } from 'react-router';
import images from '../../../utils/images';

const Hero = () => {  

  return (
    <section className="relative bg-gradient-to-r from-primary to-accent py-24">
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${images.main3})` }}></div>

      <div className="container mx-auto px-6 flex flex-col justify-center items-center text-center space-y-8 z-10">
        <div className="space-y-6 animate-fadeIn">
          <h1 className="text-5xl font-bold text-text leading-tight max-w-4xl">
            Empower Your Future with Taleem-o-Tarbiya 
          </h1>
          <p className="text-lg text-text opacity-80 max-w-3xl mx-auto">
            Unlock your potential through immersive and accessible Islamic courses and learning resources designed for every level.
          </p>
          <div className="space-x-4">
            <button className="bg-button-primary text-button-text py-2 px-8 rounded-lg shadow-lg hover:bg-button-hover-primary hover:scale-105 transition-all">
              Start Learning
            </button>
            <Link to="/explore-courses">
              <button className="border-2 border-button-text text-button-text py-2 px-8 rounded-lg shadow-lg hover:bg-button-text hover:text-background hover:scale-105 transition-all">
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
