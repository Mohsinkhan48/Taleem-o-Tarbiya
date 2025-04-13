import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import images from '../../images';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }
    try {
      const url = `http://localhost:8080/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, role, id, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('userRole', role);
        localStorage.setItem('user', JSON.stringify({ id: id, name: name }));

        setTimeout(() => {
          if (role === 'learner') {
            navigate('/secondHome');
          } else if (role === 'teacher') {
            navigate('/dashboard');
          } else {
            handleError('Invalid role');
          }
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message || 'An error occurred';
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-gray">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left: Image Section */}
        <div className="hidden md:flex items-center justify-center bg-royal-blue animate__animated animate__fadeInLeft">
          <img
            src={images.Login_islamic}
            alt="Islamic Learning"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Login Form Section */}
        <div className="flex flex-col justify-center items-center p-8">
          <h1 className="text-2xl font-bold text-royal-blue text-center mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
            <div>
              <label htmlFor="email" className="block text-charcoal-gray font-semibold mb-2">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={loginInfo.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-green"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-charcoal-gray font-semibold mb-2">
                Password
              </label>
              <input
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password..."
                value={loginInfo.password}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-green pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500 hover:text-royal-blue"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-sunset-orange text-white font-semibold rounded-md hover:bg-royal-blue transition-colors animate__animated animate__pulse"
            >
              Login
            </button>
          </form>

          {/* Social Media Login */}
          {/* <div className="mt-6">
            <p className="text-center text-charcoal-gray mb-4">Or login with</p>
            <div className="flex justify-center space-x-4">
              <button className="flex items-center justify-center w-10 h-10 bg-white shadow-md rounded-full hover:bg-red-500 transition-colors">
                <FontAwesomeIcon icon={faGoogle} className="text-royal-blue text-lg" />
              </button>
              <button className="flex items-center justify-center w-10 h-10 bg-white shadow-md rounded-full hover:bg-blue-600 transition-colors">
                <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-lg" />
              </button>
              <button className="flex items-center justify-center w-10 h-10 bg-white shadow-md rounded-full hover:bg-blue-800 transition-colors">
                <FontAwesomeIcon icon={faLinkedin} className="text-emerald-green text-lg" />
              </button>
            </div>
          </div> */}

          <p className="mt-4 text-center text-charcoal-gray">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-emerald-green hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
