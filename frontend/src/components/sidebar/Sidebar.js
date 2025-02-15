import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faBook, faUsers, faUpload, faWallet, faStar, faBell, faUser, faLifeRing } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="h-screen w-20 bg-[#231F20] text-white flex flex-col items-center p-4 shadow-lg transition-all duration-300 hover:w-48">
      <nav className="flex flex-col gap-6 mt-8 w-full">
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className="relative flex items-center gap-4 p-2 w-full group hover:bg-[#DB7C26] rounded transition-all duration-300"
        >
          <FontAwesomeIcon icon={faTachometerAlt} className="text-xl ml-4" />
          <span className="opacity-0 group-hover:opacity-100 text-white transition-all duration-300">
            Dashboard
          </span>
        </Link>

        {/* Courses */}
        <Link
          to="/courses"
          className="relative flex items-center gap-4 p-2 w-full group hover:bg-[#DB7C26] rounded transition-all duration-300"
        >
          <FontAwesomeIcon icon={faBook} className="text-xl ml-4" />
          <span className="opacity-0 group-hover:opacity-100 text-white transition-all duration-300">
            Courses
          </span>
        </Link>

        {/* Students */}
        <Link
          to="/students"
          className="relative flex items-center gap-4 p-2 w-full group hover:bg-[#DB7C26] rounded transition-all duration-300"
        >
          <FontAwesomeIcon icon={faUsers} className="text-xl ml-4" />
          <span className="opacity-0 group-hover:opacity-100 text-white transition-all duration-300">
            Students
          </span>
        </Link>

        {/* Content */}
        <Link
          to="/content"
          className="relative flex items-center gap-4 p-2 w-full group hover:bg-[#DB7C26] rounded transition-all duration-300"
        >
          <FontAwesomeIcon icon={faUpload} className="text-xl ml-4" />
          <span className="opacity-0 group-hover:opacity-100 text-white transition-all duration-300">
            Content
          </span>
        </Link>

        {/* Earnings */}
        <Link
          to="/earnings"
          className="relative flex items-center gap-4 p-2 w-full group hover:bg-[#DB7C26] rounded transition-all duration-300"
        >
          <FontAwesomeIcon icon={faWallet} className="text-xl ml-4" />
          <span className="opacity-0 group-hover:opacity-100 text-white transition-all duration-300">
            Earnings
          </span>
        </Link>

        {/* Reviews */}
        <Link
          to="/reviews"
          className="relative flex items-center gap-4 p-2 w-full group hover:bg-[#DB7C26] rounded transition-all duration-300"
        >
          <FontAwesomeIcon icon={faStar} className="text-xl ml-4" />
          <span className="opacity-0 group-hover:opacity-100 text-white transition-all duration-300">
            Reviews
          </span>
        </Link>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="relative flex items-center gap-4 p-2 w-full group hover:bg-[#DB7C26] rounded transition-all duration-300"
        >
          <FontAwesomeIcon icon={faBell} className="text-xl ml-4" />
          <span className="opacity-0 group-hover:opacity-100 text-white transition-all duration-300">
            Notifications
          </span>
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className="relative flex items-center gap-4 p-2 w-full group hover:bg-[#DB7C26] rounded transition-all duration-300"
        >
          <FontAwesomeIcon icon={faUser} className="text-xl ml-4" />
          <span className="opacity-0 group-hover:opacity-100 text-white transition-all duration-300">
            Profile
          </span>
        </Link>

        {/* Support */}
        <Link
          to="/support"
          className="relative flex items-center gap-4 p-2 w-full group hover:bg-[#DB7C26] rounded transition-all duration-300"
        >
          <FontAwesomeIcon icon={faLifeRing} className="text-xl ml-4" />
          <span className="opacity-0 group-hover:opacity-100 text-white transition-all duration-300">
            Support
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
