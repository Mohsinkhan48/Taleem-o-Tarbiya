// TeacherLayout.tsx
import { Outlet } from "react-router";
import ThemeChooser from "../../ThemeChooser";
import Footer from "../Footer";
import { FiBook, FiPlus } from "react-icons/fi";
import Sidebar, { SidebarItem } from "../Sidebar";
import { RxDashboard } from "react-icons/rx";
import Navbar from "../Navbar";
import { BsPerson } from "react-icons/bs";

function TeacherLayout() {
  const sidebarItems: SidebarItem[] = [
    { label: "Profile", icon: BsPerson, path: "profile" },
    { label: "Dashboard", icon: RxDashboard, path: "dashboard" },
    { label: "Create Course", icon: FiPlus, path: "create-course" },
    { label: "My Courses", icon: FiBook, path: "courses" },
    { label: "Stripe Account", icon: FiBook, path: "stripe/onboard" },
  ];

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-row min-h-screen">
        <Sidebar items={sidebarItems} brand="Teacher Panel" />
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

export default TeacherLayout;
