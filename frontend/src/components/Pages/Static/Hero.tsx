import { Link } from 'react-router';
import images from '../../../utils/images';
import Button from '../../Reusable/Button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary to-accent">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images.main3})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 grid place-items-center">
        <div className="text-center space-y-8 max-w-4xl animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Empower Your Future with <br className="hidden md:block" /> Taleem-o-Tarbiya
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Unlock your potential through immersive and accessible Islamic courses and learning resources designed for every level.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button variant='primary' rounded>
              Start Learning
            </Button>
            <Link to="/explore-courses">
              <Button variant='secondary' rounded>
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
