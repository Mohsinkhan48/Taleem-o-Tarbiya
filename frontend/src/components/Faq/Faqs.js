import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import 'animate.css';
import images from '../../images';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'What is Taleem o Tarbiya?',
      answer: 'Taleem o Tarbiya is an online platform providing accessible Islamic education, offering courses in multiple levels like BS, M.Phil., Ph.D., and Daras e Nizami.',
    },
    {
      question: 'How can I apply to teach?',
      answer: 'You can apply to become an instructor by visiting the "Apply to Teach" section on the website and filling out the necessary details.',
    },
    {
      question: 'Are there courses in English?',
      answer: 'Currently, the courses are available in Urdu, but we plan to add English courses in the future to cater to a global audience.',
    },
    {
      question: 'How do I enroll in a course?',
      answer: 'Simply browse through our courses, select the one that interests you, and click the "Enroll Now" button to begin your learning journey.',
    },
    {
      question: 'Is there a certification after completing a course?',
      answer: 'Yes, after successfully completing a course, you will receive a certificate that adds value to your professional credentials.',
    },
  ];

  return (
    <section className="bg-light-gray py-24">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-primaryColor mb-8 text-center animate__animated animate__fadeInUp">
        Frequently Asked Questions
      </h2>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section: Image */}
        <div className="flex flex-col h-full">
          <img
            src={images.FAQS}
            alt="FAQs"
            className="w-full h-full object-cover rounded-lg shadow-xl transform transition duration-500 hover:scale-105 animate__animated animate__fadeInUp"
          />
        </div>
  
        {/* Right Section: FAQ List */}
        <div className="flex flex-col h-full space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 animate__animated animate__fadeInUp"
            >
              <div
                onClick={() => toggleAnswer(index)}
                className="flex justify-between items-center p-6 cursor-pointer hover:bg-light-gray transition duration-300"
              >
                <h3 className="text-xl font-semibold text-textColor">{faq.question}</h3>
                <span>
                  {openIndex === index ? (
                    <FaChevronUp className="text-secondaryColor text-2xl" />
                  ) : (
                    <FaChevronDown className="text-secondaryColor text-2xl" />
                  )}
                </span>
              </div>
              {openIndex === index && (
                <div className="bg-light-gray p-6 text-charcoal-gray text-lg">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default FAQ;
