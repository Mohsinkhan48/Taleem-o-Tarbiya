import { FaChalkboardTeacher, FaBookReader } from "react-icons/fa"; // Importing Font Awesome icons
import { useNavigate } from "react-router";

const LookingFor = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary mb-6 animate__fade-in">
          What You’re Looking For
        </h2>
        <p className="text-lg text-text opacity-80 mb-12 max-w-4xl mx-auto animate__fade-in animate__delay-1s">
          Whether you're eager to teach or looking to learn, we have the right
          platform for you. Explore your options below.
        </p>

        {/* Grid layout for "You Want to Teach Here" and "You Want to Learn Here" */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* You Want to Teach Here */}
          <div
            className="bg-card text-text p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl animate__fade-in animate__delay-0.5s"
            onClick={() => navigate("/signup")}
          >
            <div className="mb-4">
              <FaChalkboardTeacher className="text-5xl text-text mx-auto" />{" "}
              {/* Teacher Icon */}
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              You Want to Teach Here
            </h3>
            <p className="text-lg mb-6">
              Share your knowledge and expertise in Islamic studies with
              students across the globe. Become an instructor and make an
              impact.
            </p>
          </div>

          {/* You Want to Learn Here */}
          <div
            className="bg-card text-text p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl animate__fade-in animate__delay-0.5s"
            onClick={() => navigate("/signup")}
          >
            <div className="mb-4">
              <FaBookReader className="text-5xl text-white mx-auto" />{" "}
              {/* Reader Icon */}
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              You Want to Learn Here
            </h3>
            <p className="text-lg mb-6">
              Join our diverse community of learners and gain in-depth knowledge
              of Islamic studies at your own pace with expert instructors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookingFor;
