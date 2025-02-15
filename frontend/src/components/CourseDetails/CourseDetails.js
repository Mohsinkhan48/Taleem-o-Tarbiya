import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'animate.css';
import images from '../../images';
import { addCourse } from '../../store';

const courseDetails = {
  id: 1,
  title: 'Dawa o Irshad',
  time: '3 hr 30 min',
  price: 30,
  chapters: 10,
  modules: 3,
  rating: 4.5,
  description:
    'Understand the foundations of Islamic preaching and guidance for communities. Learn effective communication methods to inspire and educate.',
  image: images.Dawa_o_Irshad,
  instructor: 'Dr. Ahmed Khan',
  lastUpdated: 'January 15, 2025',
  language: 'English',
};

const CourseDetails = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCartConfirmation, setShowCartConfirmation] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (parseInt(id, 10) !== courseDetails.id) {
    return <div className="text-center text-red-500 py-10">Course not found. Please check the course ID.</div>;
  }

  const handleAddToCart = () => {
    addToCart(courseDetails);
    setAddedToCart(true);
    setShowCartConfirmation(true);
  };

  const handleGoToCart = () => {
    navigate('/my-cart', { replace: true });
  };

  const handleBuyNow = () => {
    dispatch(addCourse(courseDetails));
    navigate('/checkout', { replace: true });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <i key={i} className="fa fa-star text-soft-yellow text-lg"></i>
        ))}
        {halfStar && <i className="fa fa-star-half-o text-soft-yellow text-lg"></i>}
        <span className="ml-2 text-bright-white text-sm">({rating})</span>
      </div>
    );
  };

  return (
    <div className="bg-light-gray min-h-screen">
      {/* Header Section */}
      <div className="bg-deep-blue text-bright-white py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{courseDetails.title}</h1>
            <p className="text-lg mb-6">{courseDetails.description}</p>
            <div className="space-y-3">
              <p><strong>Instructor:</strong> {courseDetails.instructor}</p>
              <p><strong>Last Updated:</strong> {courseDetails.lastUpdated}</p>
              <p><strong>Language:</strong> {courseDetails.language}</p>
              <div><strong>Rating:</strong> {renderStars(courseDetails.rating)}</div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <img
              src={courseDetails.image}
              alt={courseDetails.title}
              className="rounded-lg shadow-lg w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mt-12 bg-white p-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Get Started Today</h2>
          <p className="text-lg text-charcoal-gray mb-6">
            Enroll in <strong>{courseDetails.title}</strong> for just <span className="text-soft-yellow font-bold">{courseDetails.price}</span>.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            {addedToCart ? (
              <button onClick={handleGoToCart} className="bg-emerald-green text-white px-8 py-3 rounded-lg shadow-md hover:scale-105">
                Go to Cart
              </button>
            ) : (
              <button onClick={handleAddToCart} className="bg-emerald-green text-white px-8 py-3 rounded-lg shadow-md hover:scale-105">
                Add to Cart
              </button>
            )}
            <button onClick={handleBuyNow} className="bg-red-600 text-white px-8 py-3 rounded-lg shadow-md hover:scale-105">
              Buy Now
            </button>
          </div>

          {/* Why Learn This Course */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-black mb-6">Why You Should Learn This Course</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                'Master the fundamental concepts and practical skills.',
                'Boost your career opportunities and gain certifications.',
                'Learn from industry experts with real-world examples.',
                'Access resources and support anytime, anywhere.',
                'Stay updated with the latest trends in the field.',
                'Enhance your critical thinking and problem-solving skills.'
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <i className="fa fa-check text-emerald-green text-lg"></i>
                  <p className="text-charcoal-gray">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cart Confirmation Modal */}
      {showCartConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-black mb-4">Added to Cart</h2>
            <p className="text-lg text-charcoal-gray mb-6">
              You have successfully added <strong>{courseDetails.title}</strong> to your cart.
            </p>
            <button onClick={handleGoToCart} className="bg-emerald-green text-white px-8 py-3 rounded-lg shadow-md hover:scale-105">
              Go to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
