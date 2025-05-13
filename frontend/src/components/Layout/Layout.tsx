import { Outlet } from "react-router";
import ThemeChooser from "../ThemeChooser";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {

  return (
    <div className="bg-background">
      <Navbar/>
      <div className="flex-1 overflow-hidden min-h-screen">
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
      <ThemeChooser />
    </div>
  );
}

export default Layout;
