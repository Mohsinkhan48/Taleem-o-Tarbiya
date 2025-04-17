import { useState } from "react";
import images from "../../../utils/images";
import Input from "../../Reusable/Input";
import Button from "../../Reusable/Button";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
  };

  return (
    <section className="bg-background py-24 transition-all duration-500">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center text-text mb-12">
          <h2 className="text-4xl font-bold animate-fade-up">
            Contact Us
          </h2>
          <p className="text-lg opacity-80 animate-fade-up delay-200">
            We are here to assist you! Please reach out to us with any questions
            or feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section: Form */}
          <div className="animate-fade-up delay-300 flex flex-col h-full">
            <form
              onSubmit={handleSubmit}
              className="bg-card p-8 rounded-lg shadow-lg flex-1 border border-card-border"
            >
              <div className="space-y-4">
                <div>
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <Input
                    label="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-text mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border-2 border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-input-focus bg-input-background text-text"
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Section: Image */}
          <div className="animate-fade-up delay-500 flex flex-col h-full">
            <div className="bg-card p-8 rounded-lg shadow-lg flex-1 border border-card-border">
              <h3 className="text-2xl font-semibold text-text mb-4">
                Get in Touch
              </h3>
              <img
                src={images.Choose_us}
                alt="Contact Us"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 bg-card p-8 rounded-lg shadow-lg animate-fade-up delay-700 border border-card-border">
          <h3 className="text-3xl font-semibold text-text mb-4">
            Why Reach Out to Us?
          </h3>
          {/* Continue your section here... */}
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
