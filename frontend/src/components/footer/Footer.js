import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import 'animate.css';
// import logo from '../../assets/logo.png'; 

const Footer = () => {
  return (
    <footer className="bg-deep-blue text-white py-16 animate__animated animate__fadeInUp">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div className="flex flex-col justify-center md:justify-start">
  {/* <img src={logo} alt="Taleem o Tarbiya Logo" className="w-36 mb-4 animate__animated animate__fadeInUp" /> */}
  <h1 className="text-2xl font-bold">LOGO</h1>

  <p className="text-xl text-soft-yellow mt-4 animate__animated animate__fadeInUp">
    Empowering Education for All
  </p>
</div>


          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-soft-yellow animate__animated animate__fadeInUp">Quick Links</h3>
            <ul>
              <li><Link to="/about-us" className="hover:text-soft-yellow">About Us</Link></li>
              <li><Link to="/explore-courses" className="hover:text-soft-yellow">Our Courses</Link></li>
              <li><Link to="/contact-us" className="hover:text-soft-yellow">Contact</Link></li>
              <li><Link to="/faqs" className="hover:text-soft-yellow">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-soft-yellow animate__animated animate__fadeInUp">Contact Us</h3>
            <p className="text-lg text-gray-300">Email: <a href="mailto:info@taleemotarbiya.com" className="hover:text-sunset-orange">info@taleemotarbiya.com</a></p>
            <p className="text-lg text-gray-300">Phone: +123 456 789</p>
            <p className="text-lg text-gray-300">Address: 123, Johar Town, Lahore, Pakistan</p>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-soft-yellow animate__animated animate__fadeInUp">Follow Us</h3>
            <div className="flex space-x-6 justify-center md:justify-start">
              <a href="https://facebook.com" className="text-white text-3xl hover:text-soft-yellow"><FaFacebookF /></a>
              <a href="https://twitter.com" className="text-white text-3xl hover:text-soft-yellow"><FaTwitter /></a>
              <a href="https://instagram.com" className="text-white text-3xl hover:text-soft-yellow"><FaInstagram /></a>
              <a href="https://linkedin.com" className="text-white text-3xl hover:text-soft-yellow"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 text-center text-gray-300 text-sm">
          <p className="animate__animated animate__fadeInUp">© 2025 Taleem o Tarbiya. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
