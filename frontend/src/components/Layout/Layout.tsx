import { Outlet } from "react-router";  // <-- Add Outlet import
import ThemeChooser from "../ThemeChooser";
import LanguageChooser from "../LanguageChooser";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="bg-background">
      <Navbar />
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

export default Layout;
