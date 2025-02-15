import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import ShoppingCart from "../shopingCart/ShoppingCart";
import { clearCart } from "../../store";
import { useDispatch } from "react-redux";

const Navbar = ({ profile, isAuthenticated, setIsAuthenticated, email }) => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [cartVisible, setCartVisible] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => Array.isArray(state.cart.courses) ? state.cart.courses : []);

  console.log("Cart state:", cart);
  console.log("Is cart an array?", Array.isArray(cart)); // Should log `true`
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    dispatch(clearCart()); 
    handleSuccess("User Logged out successfully");
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="px-4 py-2 flex justify-between items-center">
          <h1 className="text-2xl font-bold">LOGOO</h1>
          <div className={toggleMenu ? "md:flex flex-col md:flex-row w-full md:w-auto" : "hidden md:flex"} id="menu">
            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <li className="cursor-pointer hover:text-soft-yellow py-2 px-3">
                <Link to="/home">Home</Link>
              </li>
              <li className="cursor-pointer hover:text-soft-yellow py-2 px-3">
                <Link to="/explore-courses">Courses</Link>
              </li>
              <li className="cursor-pointer hover:text-soft-yellow py-2 px-3">
                <Link to="/about-us">About Us</Link>
              </li>
              <li className="cursor-pointer hover:text-soft-yellow py-2 px-3">
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
  {/* Shopping Cart */}
  <Link to="/my-cart" className="relative cursor-pointer">
    <FontAwesomeIcon icon={faShoppingCart} className="text-2xl text-gray-700" />
    {cart.length > 0 && (
      <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cart.length}
      </div>
    )}
  </Link>
  {cartVisible && <ShoppingCart closeCart={() => setCartVisible(false)} />}

  {isAuthenticated ? (
    // Profile Dropdown
    <div className="relative">
      <div onClick={handleDropdownToggle} className="cursor-pointer flex items-center space-x-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
          <span className="text-xl font-bold">{profile ? profile.charAt(0) : "U"}</span>
        </div>
      </div>

      {dropdownVisible && (
        <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-64 py-4 px-6 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white">
              <span className="text-xl font-bold">{profile ? profile.charAt(0) : "U"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">{profile}</span>
              <span className="text-sm text-gray-500">{email}</span>
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="cursor-pointer hover:text-soft-yellow">
                {item.title}
              </li>
            ))}
            <li className="cursor-pointer hover:text-soft-yellow">
              <Link to="/my-cart">Go to Cart</Link>
            </li>
            <li className="cursor-pointer hover:text-soft-yellow">
              <button onClick={handleLogout} className="w-full text-left">
                Logout
              </button>
              <ToastContainer />
            </li>
          </ul>
        </div>
      )}
    </div>
  ) : (
    // Login & Signup Buttons
    <div className="flex space-x-2">
      <Link to="/login">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Login
        </button>
      </Link>
      <Link to="/signup">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
          Sign Up
        </button>
      </Link>
    </div>
  )}
</div>

          {/* Mobile Menu */}
          <div className="md:hidden cursor-pointer">
            <button onClick={handleToggle} className="focus:outline-none">
              <span className="text-xl">&#9776;</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
