import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import images from '../../../utils/images';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'What is Taleem o Tarbiya?',
      answer:
        'Taleem o Tarbiya is an online platform providing accessible Islamic education, offering courses in multiple levels like BS, M.Phil., Ph.D., and Daras e Nizami.',
    },
    {
      question: 'How can I apply to teach?',
      answer:
        'You can apply to become an instructor by visiting the "Apply to Teach" section on the website and filling out the necessary details.',
    },
    {
      question: 'Are there courses in English?',
      answer:
        'Currently, the courses are available in Urdu, but we plan to add English courses in the future to cater to a global audience.',
    },
    {
      question: 'How do I enroll in a course?',
      answer:
        'Simply browse through our courses, select the one that interests you, and click the "Enroll Now" button to begin your learning journey.',
    },
    {
      question: 'Is there a certification after completing a course?',
      answer:
        'Yes, after successfully completing a course, you will receive a certificate that adds value to your professional credentials.',
    },
  ];

  return (
    <section className="bg-card py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <h2 className="text-4xl font-bold text-primary mb-16 text-center animate-fade-up">
          Frequently Asked Questions
        </h2>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FAQ Image */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <img
              src={images.FAQS}
              alt="FAQs"
              className="w-full max-w-md rounded-xl shadow-xl transform transition hover:scale-105"
            />
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-7 space-y-6">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-input-background border border-border rounded-xl overflow-hidden shadow-md transition hover:shadow-lg"
              >
                <button
                  onClick={() => toggleAnswer(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none transition duration-300 hover:bg-card"
                >
                  <span className="text-lg font-semibold text-text">{faq.question}</span>
                  {openIndex === index ? (
                    <FaChevronUp className="text-secondary text-xl transition-transform duration-300 rotate-180" />
                  ) : (
                    <FaChevronDown className="text-secondary text-xl transition-transform duration-300" />
                  )}
                </button>
                <div
                  className={`text-text text-base transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-screen opacity-100 px-5 pb-4 ' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
