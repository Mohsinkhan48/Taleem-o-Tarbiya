// components/Sidebar.tsx
import { useState } from "react";
import { IconType } from "react-icons";
import { NavLink } from "react-router";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
    <div
      className={`bg-card text-text h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? "w-16" : "w-auto"
      }`}
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-4 py-4">
        <span className={`text-xl font-bold ${collapsed ? "hidden" : "block"}`}>
          {brand || "Sidebar"}
        </span>
        <button onClick={() => setCollapsed(!collapsed)} className="text-white">
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Items */}
      <nav className="mt-4 flex flex-col">
        {items.map(({ label, icon: Icon, path }) => (
          <NavLink
            to={path}
            key={label}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 transition ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            <Icon size={20} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
