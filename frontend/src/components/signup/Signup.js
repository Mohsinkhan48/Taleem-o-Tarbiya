import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';
import 'animate.css';
import images from '../../images';

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }
    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-gray">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:flex items-center justify-center bg-royal-blue animate__animated animate__fadeInLeft">
          <img
            src={images.Login_islamic}
            alt="Islamic Learning"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Signup Form */}
        <div className="p-8 animate__animated animate__fadeInRight">
          <h1 className="text-3xl font-bold text-royal-blue text-center mb-6">Signup</h1>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-charcoal-gray font-semibold mb-2">
                Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Enter your name..."
                value={signupInfo.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-green"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-charcoal-gray font-semibold mb-2">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={signupInfo.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-green"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-charcoal-gray font-semibold mb-2">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={signupInfo.password}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-green"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-sunset-orange text-white font-semibold rounded-md hover:bg-royal-blue transition-colors"
            >
              Signup
            </button>
          </form>
          <p className="mt-4 text-center text-charcoal-gray">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-green hover:underline">
              Login
            </Link>
          </p>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Signup;
