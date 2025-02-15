import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Home from './components/Home/Home';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/Footer';
import SecondHome from './components/SecondHome/SecondHome';
import CourseDetails from './components/CourseDetails/CourseDetails';
import ExploreCourses from './components/ExploreCourses/ExploreCourse';
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/ContactUs/ContactUs';
import ShoppingCart from './components/shopingCart/ShoppingCart';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './instructorAdmin/Dashboard/Dashboard';
import Checkout from './checkout/Checkout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = (course) => {
    setCart([...cart, course]);
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Navbar profile="Mohsin" isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} email="mohsin@example.com"  cart={cart}/>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/secondHome" : "/home"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/secondHome" element={<PrivateRoute element={<SecondHome />} />} />
        <Route path="/course/:id" element={<CourseDetails addToCart={addToCart}/>} />
        <Route path="/explore-courses" element={<ExploreCourses />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/my-cart" element={<ShoppingCart cart={cart} />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout" element={<Checkout />} />





      </Routes>
      <Footer />
    </div>
  );
}

export default App;
