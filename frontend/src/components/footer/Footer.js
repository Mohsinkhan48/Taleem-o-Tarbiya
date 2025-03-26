import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import 'animate.css';

const Footer = () => {
  return (
    <footer className="bg-[#0E2431] text-[#F5F5F5] py-16 animate__animated animate__fadeInUp">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-3xl font-bold text-[#DB7C26] animate__animated animate__fadeInUp">Taleem-o-Tarbiya</h1>
            <p className="text-xl text-[#E9C46A] mt-4 animate__animated animate__fadeInUp">
              Empowering Education for All
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-[#DB7C26] animate__animated animate__fadeInUp">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="hover:text-[#E9C46A] transition duration-300">About Us</Link></li>
              <li><Link to="/explore-courses" className="hover:text-[#E9C46A] transition duration-300">Our Courses</Link></li>
              <li><Link to="/contact-us" className="hover:text-[#E9C46A] transition duration-300">Contact</Link></li>
              <li><Link to="/faqs" className="hover:text-[#E9C46A] transition duration-300">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-[#DB7C26] animate__animated animate__fadeInUp">Contact Us</h3>
            <p className="text-lg text-[#F5F5F5]">Email: <a href="mailto:info@taleemotarbiya.com" className="hover:text-[#E9C46A] transition duration-300">info@taleemotarbiya.com</a></p>
            <p className="text-lg text-[#F5F5F5]">Phone: +123 456 789</p>
            <p className="text-lg text-[#F5F5F5]">Address: 123, Johar Town, Lahore, Pakistan</p>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-[#DB7C26] animate__animated animate__fadeInUp">Follow Us</h3>
            <div className="flex space-x-6 justify-center md:justify-start">
              <a href="https://facebook.com" className="text-[#F5F5F5] text-3xl hover:text-[#E9C46A] transition duration-300"><FaFacebookF /></a>
              <a href="https://twitter.com" className="text-[#F5F5F5] text-3xl hover:text-[#E9C46A] transition duration-300"><FaTwitter /></a>
              <a href="https://instagram.com" className="text-[#F5F5F5] text-3xl hover:text-[#E9C46A] transition duration-300"><FaInstagram /></a>
              <a href="https://linkedin.com" className="text-[#F5F5F5] text-3xl hover:text-[#E9C46A] transition duration-300"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 text-center text-[#E9C46A] text-sm animate__animated animate__fadeInUp">
          <p>© 2025 Taleem o Tarbiya. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
