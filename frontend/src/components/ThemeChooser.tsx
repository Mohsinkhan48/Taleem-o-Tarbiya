import { themes, Theme } from "../constants/theme.constants";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const ThemeChooser = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleDropdown}
        className="px-3 py-2 text-sm font-medium rounded-full border border-border bg-button-primary shadow-lg hover:bg-button-hover-primary transition"
      >
        {theme.charAt(0).toUpperCase() + theme.slice(1)}
      </button>

      {isOpen && (
        <div className="absolute flex flex-col gap-1 bottom-12 p-1 right-0 w-36 bg-card border border-border rounded-md">
          {themes.map((t) => (
            <button
              key={t}
              className={`block w-full text-left px-2 py-1 text-sm rounded-md transition ${
                theme === t
                  ? "bg-button-hover-primary text-white"
                  : "hover:bg-button-hover-primary"
              }`}
              onClick={() => selectTheme(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeChooser;
