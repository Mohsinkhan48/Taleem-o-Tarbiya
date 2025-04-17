import { useState } from "react";
import { languages, Language } from "../constants/language.constants";
import { useLanguage } from "../context/LanguageContext";

const LanguageChooser = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectLanguage = (newLang: Language) => {
    setLanguage(newLang);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-16 right-4 z-50">
      <button
        onClick={toggleDropdown}
        className="px-3 py-2 text-sm font-medium rounded-full border border-border bg-button-primary shadow-lg hover:bg-button-hover-primary transition"
      >
        {language.toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute flex flex-col gap-1 bottom-12 p-1 right-0 w-36 bg-card border border-border rounded-md">
          {languages.map((lang) => (
            <button
              key={lang}
              className={`block w-full text-left px-2 py-1 text-sm rounded-md transition ${
                language === lang
                  ? "bg-button-hover-primary text-white"
                  : "hover:bg-button-hover-primary"
              }`}
              onClick={() => selectLanguage(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageChooser;
