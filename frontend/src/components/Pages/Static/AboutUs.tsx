import images from "../../../utils/images";

const AboutUs = () => {
  return (
    <section className="py-24 bg-background text-text">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 animate-fade-in-up">About Taleem-o-Tarbiya</h2>
          <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Taleem-o-Tarbiya is a revolutionary Learning Management System (LMS) aimed at providing quality Islamic education across all levels. Our mission is to make learning accessible, engaging, and impactful for students and educators worldwide.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-card border border-card-border rounded-xl shadow-lg p-8 animate-fade-in-up delay-300">
            <h3 className="text-2xl font-semibold text-primary mb-4">Our Mission</h3>
            <p className="text-base leading-relaxed text-text">
              We aim to bridge the gap in Islamic education by offering courses for all ages and backgrounds. Our courses are tailored to empower individuals with knowledge and skills for both religious and professional growth.
            </p>
          </div>

          <div className="bg-card border border-card-border rounded-xl shadow-lg p-8 animate-fade-in-up delay-400">
            <h3 className="text-2xl font-semibold text-primary mb-4">Our Vision</h3>
            <p className="text-base leading-relaxed text-text">
              We envision a world where quality Islamic education is accessible to everyone, regardless of their geographical location or socio-economic status. Our vision is to create a global community of learners dedicated to lifelong learning.
            </p>
          </div>

          <div className="bg-card border border-card-border rounded-xl shadow-lg p-8 animate-fade-in-up delay-500">
            <h3 className="text-2xl font-semibold text-primary mb-4">Our Core Values</h3>
            <ul className="list-disc list-inside text-base text-text space-y-1">
              <li>Integrity in education</li>
              <li>Commitment to excellence</li>
              <li>Inclusivity and accessibility</li>
              <li>Fostering a growth mindset</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center animate-fade-in-up delay-600">
          <h2 className="text-3xl font-semibold text-primary mb-10">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {/* Team Member 1 */}
            <div className="w-64 text-center">
              <img src={images.CEO} alt="Mohsin Khan" className="w-32 h-32 rounded-full mx-auto shadow-md mb-4 object-cover" />
              <h4 className="text-xl font-semibold text-text">Mohsin Khan</h4>
              <p className="text-base text-secondary">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="w-64 text-center">
              <img src={images.Choose_us} alt="Hammad" className="w-32 h-32 rounded-full mx-auto shadow-md mb-4 object-cover" />
              <h4 className="text-xl font-semibold text-text">Hammad</h4>
              <p className="text-base text-secondary">Chief Content Officer</p>
            </div>

            {/* Team Member 3 */}
            <div className="w-64 text-center">
              <img src={images.Sciences_Quran} alt="Team Member" className="w-32 h-32 rounded-full mx-auto shadow-md mb-4 object-cover" />
              <h4 className="text-xl font-semibold text-text">Team Member</h4>
              <p className="text-base text-secondary">Role Title</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
