import React, { useState } from 'react';
import 'animate.css';
import images from '../../images';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    alert('Thank you for contacting us! We will get back to you soon.');
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center text-charcoal-gray mb-12">
          <h2 className="text-4xl font-bold animate__animated animate__fadeInUp">
            Contact Us
          </h2>
          <p className="text-lg opacity-80 animate__animated animate__fadeInUp animate__delay-1s">
            We are here to assist you! Please reach out to us with any questions or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section: Form */}
          <div className="animate__animated animate__fadeInUp animate__delay-2s flex flex-col h-full">
            <form onSubmit={handleSubmit} className="bg-light-gray p-8 rounded-lg shadow-lg flex-1">
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-semibold text-charcoal-gray mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-green"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-charcoal-gray mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-green"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-charcoal-gray mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-green"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-green text-white py-3 rounded-lg hover:bg-sunset-orange transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Section: Image */}
          <div className="animate__animated animate__fadeInUp animate__delay-3s flex flex-col h-full">
  <div className="bg-light-blue p-8 rounded-lg shadow-lg flex-1">
    <h3 className="text-2xl font-semibold text-charcoal-gray mb-4">Get in Touch</h3>
    <img
      src={images.Choose_us} // Replace with the actual image
      alt="Contact Us"
      className="w-full rounded-lg shadow-lg"
    />
  </div>
</div>

        </div>

        <div className="mt-12 bg-light-gray p-8 rounded-lg shadow-lg animate__animated animate__fadeInUp animate__delay-4s">
          <h3 className="text-3xl font-semibold text-charcoal-gray mb-4">Why Reach Out to Us?</h3>
          <p className="text-lg text-gray-700 mb-6">
            Whether you’re a student looking for assistance with a course or someone interested in collaborating with us, we are always eager to connect. Our dedicated team is ready to support your learning journey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-emerald-green text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold mb-2">Support</h4>
              <p>
                Need help with accessing your courses or resolving technical issues? We're here to guide you through every step of your learning experience.
              </p>
            </div>

            <div className="bg-sunset-orange text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h4 className="text-xl font-semibold mb-2">Feedback</h4>
              <p>
                Your feedback helps us improve. Whether it’s about our courses, user interface, or anything else, we would love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
