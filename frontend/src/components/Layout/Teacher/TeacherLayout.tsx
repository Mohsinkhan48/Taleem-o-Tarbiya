// TeacherLayout.tsx
import { Outlet } from "react-router";
import ThemeChooser from "../../ThemeChooser";
import LanguageChooser from "../../LanguageChooser";
import Footer from "../Footer";
import { FiBook, FiUsers, FiPlus } from "react-icons/fi";
import Sidebar, { SidebarItem } from "../Sidebar";
import { RxDashboard } from "react-icons/rx";
import TeacherNavbar from "./TeacherNavbar";

function TeacherLayout() {

  const sidebarItems: SidebarItem[] = [
    { label: "Dashboard", icon: RxDashboard, path: "dashboard" },
    { label: "Create Course", icon: FiPlus, path: "create-course" },
    { label: "My Courses", icon: FiBook, path: "courses" },
    { label: "Students", icon: FiUsers, path: "students" },
  ];
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <TeacherNavbar />
      <div className="flex-1 flex flex-row min-h-screen">
        <Sidebar items={sidebarItems} brand="Teacher Panel" />
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
      <Footer />
      <ThemeChooser />
      <LanguageChooser />
    </div>
  );
}

export default TeacherLayout;
