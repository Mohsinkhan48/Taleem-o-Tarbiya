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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const onLogout = () => dispatch(logoutUser());
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleDashboardNavigation = () => {
    switch (user?.role?.name) {
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
    if (user?.role?.name === "student") {
      return <CartButton />;
    }
    return null;
  };

  return (
    <header className="bg-navbar-background shadow-md relative z-50">
      <div className="px-4 py-2 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-navbar-text">Taleem-o-Tarbiya</h1>
        </Link>

        <div
          className={
            toggleMenu
              ? "md:flex flex-col md:flex-row w-full md:w-auto"
              : "hidden md:flex"
          }
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-navbar-text">
            <li className="cursor-pointer hover:text-navbar-link-hover py-2 px-3">
              <Link to="/explore-courses">Courses</Link>
            </li>
            <li className="cursor-pointer hover:text-navbar-link-hover py-2 px-3">
              <Link to="/about-us">About Us</Link>
            </li>
            <li className="cursor-pointer hover:text-navbar-link-hover py-2 px-3">
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4 relative">
          {isAuthenticated ? (
            <>
              {renderButtons()}

              {/* Custom Dropdown on Hover */}
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="cursor-pointer flex items-center space-x-2">
                  <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-navbar-text">
                    <span className="text-xl font-bold">
                      {user?.fullName?.charAt(0) || "U"}
                    </span>
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full bg-navbar-background border border-navbar-border rounded-md shadow-lg z-50">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center text-navbar-text">
                        <span className="text-xl font-bold">
                          {user?.fullName?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-navbar-text">
                          {user?.fullName}
                        </span>
                        <span className="text-sm text-navbar-secondary">
                          {user?.email}
                        </span>
                      </div>
                    </div>

                    <hr className="my-2 border-navbar-border" />

                    <div className="px-4 py-2 space-y-2">
                      <Button
                        onClick={handleDashboardNavigation}
                        variant="primary"
                        className="w-full"
                      >
                        Go to Dashboard
                      </Button>
                      <Button
                        onClick={onLogout}
                        variant="danger"
                        isLoading={loading}
                        className="w-full"
                      >
                        Logout
                      </Button>
                    </div>
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

        {/* Mobile Menu Button */}
        <div className="md:hidden cursor-pointer">
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            className="focus:outline-none"
          >
            <span className="text-xl text-navbar-text">&#9776;</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
