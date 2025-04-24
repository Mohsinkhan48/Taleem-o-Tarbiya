import { ReactNode, MouseEvent } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-65 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="rounded-lg shadow-lg mx-auto relative text-text bg-background p-6 min-h-72"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text"
        >
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
