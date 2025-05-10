import { Outlet } from "react-router";
import ThemeChooser from "../../ThemeChooser";
import LanguageChooser from "../../LanguageChooser";
import Footer from "../Footer";
import { FiBook } from "react-icons/fi";
import Sidebar, { SidebarItem } from "../Sidebar";
import Navbar from "../Navbar";

function StudentLayout() {
  const sidebarItems: SidebarItem[] = [
    { label: "My Courses", icon: FiBook, path: "courses" },
  ];
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-row min-h-screen">
        <Sidebar items={sidebarItems} brand="Student Panel" />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
      <ThemeChooser />
      <LanguageChooser />
    </div>
  );
}

export default StudentLayout;
