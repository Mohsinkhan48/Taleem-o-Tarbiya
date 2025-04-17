import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeToast } from "../../redux/slices/toasterSlice";

const ToasterContainer: React.FC = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toaster.toasts);

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, toast.duration || 3000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts, dispatch]);

  return (
    <div className="fixed top-5 right-5 flex flex-col space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`relative flex items-center justify-between px-4 py-3 rounded-md shadow-md transition-all duration-300
          ${toast.type === "success" ? "bg-success" : ""}
          ${toast.type === "error" ? "bg-error" : ""}
          ${toast.type === "warning" ? "bg-warning" : ""}
          ${toast.type === "info" ? "bg-info" : ""}
          `}
        >
          <span className="text-sm font-medium">{toast.message}</span>

          {/* Close Button */}
          <button
            className="ml-4 text-xl font-bold leading-none focus:outline-none transition"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the parent onClick
              dispatch(removeToast(toast.id));
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToasterContainer;
