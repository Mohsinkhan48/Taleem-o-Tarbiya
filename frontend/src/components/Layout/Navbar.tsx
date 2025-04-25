import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../Reusable/Button";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { useAuth } from "../../hooks/useAuth";
import CartButton from "./Student/CartButton";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const onLogout = () => dispatch(logoutUser());
  const { loading } = useSelector((state: RootState) => state.auth);
  const handleDashboardNavigation = () => {
    switch (user?.role.name) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "teacher":
        navigate("/teacher/dashboard");
        break;
      case "student":
        navigate("/student/dashboard");
        break;
      default:
        navigate("/unauthorized");
    }
  };

  const renderButtons = () => {
    if (user?.role.name === "student") {
      return <CartButton />;
    }
    return null;
  };

  return (
    <header className="bg-background shadow-md">
      <div className="px-4 py-2 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-text">Taleem-o-Tarbiya</h1>
        </Link>

        <div
          className={
            toggleMenu
              ? "md:flex flex-col md:flex-row w-full md:w-auto"
              : "hidden md:flex"
          }
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-text">
            <li className="cursor-pointer hover:text-link py-2 px-3">
              <Link to="/explore-courses">Courses</Link>
            </li>
            <li className="cursor-pointer hover:text-link py-2 px-3">
              <Link to="/about-us">About Us</Link>
            </li>
            <li className="cursor-pointer hover:text-link py-2 px-3">
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {renderButtons()}

              <div className="relative">
                <div
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                  className="cursor-pointer flex items-center space-x-2"
                >
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                    <span className="text-xl font-bold">
                      {user?.fullName?.charAt(0) || "U"}
                    </span>
                  </div>
                </div>
                {dropdownVisible && (
                  <div className="absolute top-12 right-0 bg-card shadow-lg rounded-md w-64 py-4 px-6 z-20">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white">
                        <span className="text-xl font-bold">
                          {user?.fullName?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-text">
                          {user?.fullName}
                        </span>
                        <span className="text-sm text-gray-500">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                    <hr className="my-4 border-border" />
                    <ul className="space-y-2">
                      <li className="cursor-pointer hover:text-link">
                        <Button
                          onClick={handleDashboardNavigation}
                          variant="primary"
                        >
                          Go to Dashboard
                        </Button>
                      </li>
                      <li className="cursor-pointer hover:text-link">
                        <Button onClick={onLogout} variant="danger" isLoading={loading}>
                          Logout
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden cursor-pointer">
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="focus:outline-none"
          >
            <span className="text-xl text-text">&#9776;</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
