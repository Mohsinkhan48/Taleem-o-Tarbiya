// AdminLayout.tsx
import { Outlet } from "react-router";
import ThemeChooser from "../../ThemeChooser";
import LanguageChooser from "../../LanguageChooser";
import Footer from "../Footer";
import Navbar from "../Navbar";

function AdminLayout() {
  return (
    <div>
      <Navbar />
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

export default AdminLayout;
