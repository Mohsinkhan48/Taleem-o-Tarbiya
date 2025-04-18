// AdminLayout.tsx
import { Outlet } from "react-router";
import ThemeChooser from "../../ThemeChooser";
import LanguageChooser from "../../LanguageChooser";
import Footer from "../Footer";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
  return (
    <div>
      <AdminNavbar/>
      <div className="flex-1 overflow-hidden min-h-screen">
        <main>
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>
      <Footer />
      <ThemeChooser />
      <LanguageChooser />
    </div>
  );
}

export default AdminLayout;
