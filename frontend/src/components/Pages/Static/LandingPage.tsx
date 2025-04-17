import OurPopularCourses from "../Course/OurPopularCourses";
import FAQ from "./Faqs";
import Hero from "./Hero";
import LookingFor from "./LookingFor";
import WhyOurs from "./WhyOurs";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <WhyOurs />
      <OurPopularCourses heading="Our Popular Courses" secondHeading="" />
      <LookingFor />
      <FAQ />
    </>
  );
};

export default LandingPage;
