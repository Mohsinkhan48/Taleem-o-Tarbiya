const WhyOurs = () => {
  return (
    <section className="relative bg-card py-24"> 
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 z-10">
       
        <div className="md:w-1/3 w-full overflow-hidden relative animate__fadeInLeft">
          <img
            src='https://img.freepik.com/free-vector/hand-drawn-flat-design-mba-illustration-illustration_23-2149331623.jpg?semt=ais_hybrid'
            alt="Best Achievements"
            className="object-cover w-full h-full rounded-lg transform transition-transform duration-500 hover:scale-110 hover:shadow-lg"
          />
        </div>

        <div className="md:w-2/3 w-full space-y-6 text-center md:text-left animate__fadeInRight md:ml-16">
          <h2 className="text-4xl font-bold text-primary leading-tight">
            Why Choose Taleem-o-Tarbiya?
          </h2>
          <p className="text-lg text-text opacity-80 max-w-3xl mx-auto">
            Taleem-o-Tarbiya is an online platform providing accessible Islamic education. Our courses are designed to cater to students at different academic levels, ensuring comprehensive learning for all.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg text-text opacity-80">
            {/* Achievement 1 */}
            <div className="flex items-center space-x-4 animate__fadeInUp animate__delay-1s">
              <span className="text-3xl font-semibold text-secondary">10</span>
              <div>
                <h3 className="font-bold text-accent">University Scholars</h3>
                <p className="text-sm">Our platform empowers over 55,000 university scholars, delivering high-quality courses in Islamic studies.</p>
              </div>
            </div>

            {/* Achievement 2 */}
            <div className="flex items-center space-x-4 animate__fadeInUp animate__delay-2s">
              <span className="text-3xl font-semibold text-secondary">9</span>
              <div>
                <h3 className="font-bold text-accent">Professional Educators</h3>
                <p className="text-sm">We have over 17,000 professional educators dedicated to teaching and mentoring students in Islamic education.</p>
              </div>
            </div>

            {/* Achievement 3 */}
            <div className="flex items-center space-x-4 animate__fadeInUp animate__delay-3s">
              <span className="text-3xl font-semibold text-secondary">11+</span>
              <div>
                <h3 className="font-bold text-accent">Accredited Courses</h3>
                <p className="text-sm">We offer accredited courses in Urdu for BS, M.Phil., Ph.D., and Daras e Nizami levels. Our goal is to expand to English courses for a global audience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyOurs;
