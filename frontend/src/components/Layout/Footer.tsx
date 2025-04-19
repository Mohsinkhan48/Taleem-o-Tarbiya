import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-card text-text py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-primary mb-3">Taleem-o-Tarbiya</h1>
            <p className="text-secondary text-lg">Empowering Education for All</p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="hover:text-accent transition">About Us</Link></li>
              <li><Link to="/explore-courses" className="hover:text-accent transition">Our Courses</Link></li>
              <li><Link to="/contact-us" className="hover:text-accent transition">Contact</Link></li>
              <li><Link to="/faqs" className="hover:text-accent transition">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-primary mb-4">Contact Us</h3>
            <p>Email: <a href="mailto:info@taleemotarbiya.com" className="hover:text-accent transition">info@taleemotarbiya.com</a></p>
            <p>Phone: +123 456 789</p>
            <p>Address: 123, Johar Town, Lahore, Pakistan</p>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-primary mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-5">
              <a href="https://facebook.com" className="text-2xl hover:text-accent transition"><FaFacebookF /></a>
              <a href="https://twitter.com" className="text-2xl hover:text-accent transition"><FaTwitter /></a>
              <a href="https://instagram.com" className="text-2xl hover:text-accent transition"><FaInstagram /></a>
              <a href="https://linkedin.com" className="text-2xl hover:text-accent transition"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-12 pt-6 text-center text-sm text-secondary">
          © 2025 Taleem-o-Tarbiya. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
