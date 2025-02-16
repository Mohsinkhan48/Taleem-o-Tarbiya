import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt, faBook, faUsers,
  faUpload, faWallet, faStar,
  faBell, faUser, faLifeRing
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={` mb-4 h-150 bg-[#0E2431] text-[#F5F5F5] py-16 animate__animated animate__fadeInUp text-white flex flex-col items-start p-4 shadow-lg transition-all duration-300 ${
        isExpanded ? "w-48" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="flex flex-col gap-4 mt-6 w-full">
        {[
          { to: "/dashboard", icon: faTachometerAlt, text: "Dashboard" },
          { to: "/courses", icon: faBook, text: "Courses" },
          { to: "/students", icon: faUsers, text: "Students" },
          { to: "/content", icon: faUpload, text: "Content" },
          { to: "/earnings", icon: faWallet, text: "Earnings" },
          { to: "/reviews", icon: faStar, text: "Reviews" },
          { to: "/notifications", icon: faBell, text: "Notifications" },
          { to: "/profile", icon: faUser, text: "Profile" },
          { to: "/support", icon: faLifeRing, text: "Support" },
        ].map(({ to, icon, text }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-4 p-3 w-full rounded-md transition-all duration-300 hover:bg-[#DB7C26]"
          >
            <FontAwesomeIcon icon={icon} className="text-xl" />
            <span className={`text-white transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
              {text}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
