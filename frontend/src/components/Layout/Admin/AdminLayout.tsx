// AdminLayout.tsx
import { Outlet } from "react-router";
import ThemeChooser from "../../ThemeChooser";
import LanguageChooser from "../../LanguageChooser";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Sidebar, { SidebarItem } from "../Sidebar";
import { RxDashboard } from "react-icons/rx";

function AdminLayout() {
    const sidebarItems: SidebarItem[] = [
      { label: "Dashboard", icon: RxDashboard, path: "dashboard" },
    ];
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-row min-h-screen">
        <Sidebar items={sidebarItems} brand="Student Panel" />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
      <Footer />
      <ThemeChooser />
      <LanguageChooser />
    </div>
  );
}

export default AdminLayout;
