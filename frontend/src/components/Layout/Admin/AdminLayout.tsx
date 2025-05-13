// AdminLayout.tsx
import { Outlet } from "react-router";
import ThemeChooser from "../../ThemeChooser";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Sidebar, { SidebarItem } from "../Sidebar";
import { RxDashboard } from "react-icons/rx";
import { MdPayment } from "react-icons/md";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

function AdminLayout() {
  const sidebarItems: SidebarItem[] = [
    { label: "Dashboard", icon: RxDashboard, path: "dashboard" },
    { label: "Instructors", icon: FaChalkboardTeacher, path: "teachers" },
    { label: "Students", icon: FaUserGraduate, path: "students" },
    { label: "Payments", icon: MdPayment, path: "payments" },
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

export default AdminLayout;
