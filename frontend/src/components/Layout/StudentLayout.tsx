// AdminLayout.tsx
import { Outlet } from "react-router";
import ThemeChooser from "../ThemeChooser";
import LanguageChooser from "../LanguageChooser";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

function StudentLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <div className="flex-1 overflow-hidden">
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

export default StudentLayout;
