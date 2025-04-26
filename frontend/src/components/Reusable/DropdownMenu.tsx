import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface DropdownMenuProps {
  button: React.ReactNode;
  buttonClassName?: string;
  menuClassName?: string;
  children: React.ReactNode;
  position?: "right-down" | "left-down" | "left-up" | "right-up" | "up" | "down" | "left" | "right";
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  button,
  buttonClassName = "",
  menuClassName = "",
  children,
  position = "right-down", // default
}) => {
  const [open, setOpen] = useState(false);
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && buttonRef.current && menuRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      let styles: React.CSSProperties = {
        position: "absolute",
        zIndex: 9999,
      };

      switch (position) {
        case "right-down":
          styles.top = rect.bottom + scrollY;
          styles.left = rect.left + scrollX;
          break;
        case "left-down":
          styles.top = rect.bottom + scrollY;
          styles.left = rect.right + scrollX - menuRect.width;
          break;
        case "right-up":
          styles.top = rect.top + scrollY - menuRect.height;
          styles.left = rect.left + scrollX;
          break;
        case "left-up":
          styles.top = rect.top + scrollY - menuRect.height;
          styles.left = rect.right + scrollX - menuRect.width;
          break;
        case "up":
          styles.top = rect.top + scrollY - menuRect.height;
          styles.left = rect.left + scrollX + rect.width / 2 - menuRect.width / 2;
          break;
        case "down":
          styles.top = rect.bottom + scrollY;
          styles.left = rect.left + scrollX + rect.width / 2 - menuRect.width / 2;
          break;
        case "left":
          styles.top = rect.top + scrollY + rect.height / 2 - menuRect.height / 2;
          styles.left = rect.left + scrollX - menuRect.width;
          break;
        case "right":
          styles.top = rect.top + scrollY + rect.height / 2 - menuRect.height / 2;
          styles.left = rect.right + scrollX;
          break;
        default:
          styles.top = rect.bottom + scrollY;
          styles.left = rect.left + scrollX;
      }

      setMenuStyles(styles);
    }
  }, [open, position]);

  const handleButtonClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div
        ref={buttonRef}
        onClick={handleButtonClick}
        className={`inline-flex justify-center items-center cursor-pointer ${buttonClassName}`}
      >
        {button}
      </div>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={menuStyles}
            className={`${menuClassName}`}
          >
            <div>{children}</div>
          </div>,
          document.body
        )}
    </>
  );
};

export default DropdownMenu;
