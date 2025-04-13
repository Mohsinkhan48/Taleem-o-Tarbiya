import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Home from "./components/Home/Home";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";
import SecondHome from "./components/SecondHome/SecondHome";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import ExploreCourses from "./components/ExploreCourses/ExploreCourse";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import ShoppingCart from "./components/shopingCart/ShoppingCart";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./instructorAdmin/Dashboard/Dashboard";
import Checkout from "./checkout/Checkout";
import CourseContent from "./components/CourseContent";
import CreateCourse from "./components/createcourse/CreateCourse";
import CourseModulesWrapper from "./components/CourseModulesWrapper";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const location = useLocation(); // Get the current route

  const addToCart = (course) => {
    setCart([...cart, course]);
  };
  const courseId = '67fa75712de62718d8dcb8c6';

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const isDashboard = location.pathname.startsWith("/dashboard"); // Check if it's a dashboard route

  return (
    <div className="App">
      <Navbar
        profile="Mohsin"
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        email="mohsin@example.com"
        cart={cart}
      />
      <RefreshHandler
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
      />

      {/* Conditionally apply sidebar only for dashboard */}
      {isDashboard ? (
        <div className="flex w-full">
          <Sidebar />
          <div className="w-full">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/secondHome" : "/home"} />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/secondHome"
            element={<PrivateRoute element={<SecondHome />} />}
          />
          <Route
            path="/course/:id"
            element={<CourseDetails addToCart={addToCart} />}
          />
          <Route path="/explore-courses" element={<ExploreCourses />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/my-cart" element={<ShoppingCart cart={cart} />} />
          <Route
            path="/checkout"
            element={<PrivateRoute element={<Checkout />} />}
          />
          <Route
            path="/course-content/:courseId"
            element={<PrivateRoute element={<CourseContent />} />}
          />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route
  path="/course/:courseId/modules"
  element={<PrivateRoute element={<CourseModulesWrapper />} />}
/>
        </Routes>
      )}

      <Footer />
    </div>
  );
}

export default App;
