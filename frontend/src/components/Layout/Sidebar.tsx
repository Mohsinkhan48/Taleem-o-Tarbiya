import { useState } from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router"; // fixed import
import { FiChevronLeft } from "react-icons/fi";

export interface SidebarItem {
  label: string;
  icon: IconType;
  path: string;
}

interface SidebarProps {
  items: SidebarItem[];
  brand?: string;
}

const Sidebar = ({ items, brand }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative bg-sidebar-bg text-sidebar-text border-r border-sidebar-border h-screen sticky top-0 transition-all duration-300 flex flex-col ${
        collapsed ? "w-20" : "w-52"
      }`}
    >
      {/* Header with Brand and Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-xl font-bold text-primary transition-all duration-200">
            {brand || "Sidebar"}
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`
            w-7 h-7 flex items-center justify-center rounded-full 
            bg-white border border-sidebar-border text-sidebar-icon 
            shadow-md hover:bg-sidebar-hover transition-transform duration-300
            ${collapsed ? "rotate-180" : ""}
          `}
        >
          <FiChevronLeft size={16} />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto mt-2 space-y-1">
        {items.map(({ label, icon: Icon, path }) => (
          <NavLink
            to={path}
            key={label}
            className={({ isActive }) =>
              `group flex items-center ${
                collapsed ? "justify-center" : "justify-start gap-3 px-4"
              } py-3 text-sm mx-2 transition-all duration-200 rounded-full
              hover:bg-sidebar-hover hover:text-primary ${
                isActive
                  ? "bg-sidebar-hover text-sidebar-active font-medium"
                  : "text-sidebar-text"
              }`
            }
          >
            <div
              className={`
                flex items-center justify-center 
                ${collapsed ? "w-10 h-10 rounded-full" : ""}
                transition-all duration-200
                hover:bg-sidebar-hover
              `}
            >
              <Icon
                size={20}
                className="text-sidebar-icon transition-transform duration-200 group-hover:scale-110"
              />
            </div>

            {/* Label with animation */}
            <span
              className={`transition-all duration-300 origin-left ${
                collapsed ? "opacity-0 scale-90 w-0 overflow-hidden" : "opacity-100 scale-100"
              }`}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
