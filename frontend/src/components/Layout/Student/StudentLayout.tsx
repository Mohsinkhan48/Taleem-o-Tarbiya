import { Outlet } from "react-router";
import ThemeChooser from "../../ThemeChooser";
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
        <main className="flex-1 flex flex-col overflow-auto">
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
      <ThemeChooser />
    </div>
  );
}

export default StudentLayout;
