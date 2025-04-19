import { Outlet } from "react-router";
import ThemeChooser from "../ThemeChooser";
import LanguageChooser from "../LanguageChooser";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../../hooks/useAuth";
import StudentNavbar from "./Student/StudentNavbar";
import TeacherNavbar from "./Teacher/TeacherNavbar";
import AdminNavbar from "./Admin/AdminNavbar";

function Layout() {
  const { user } = useAuth();

  const renderNavbar = () => {
    if (!user || !user.role || !user.role.name) return <Navbar />;
    
    switch (user.role.name.toLowerCase()) {
      case "student":
        return <StudentNavbar />;
      case "teacher":
        return <TeacherNavbar />;
      case "admin":
        return <AdminNavbar />;
      default:
        return <Navbar />;
    }
  };

  return (
    <div className="bg-background">
      {renderNavbar()}
      <div className="flex-1 overflow-hidden min-h-screen">
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
      <ThemeChooser />
      <LanguageChooser />
    </div>
  );
}

export default Layout;
