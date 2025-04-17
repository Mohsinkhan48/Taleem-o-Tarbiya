// import React, { createContext, useContext, useState, ReactNode } from "react";
// import ToasterContainer from "../components/Reusable/Toaster";
// import { ToastOptions, ToastProps } from "../types/toaster.types";

// interface ToasterContextType {
//   showToast: (message: string, options?: ToastOptions) => void;
// }

// const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

// export const useToaster = () => {
//   const context = useContext(ToasterContext);
//   if (!context) {
//     throw new Error("useToaster must be used within a ToasterProvider");
//   }
//   return context;
// };

// export const ToasterProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [toasts, setToasts] = useState<ToastProps[]>([]);

//   const showToast = (message: string, options?: ToastOptions) => {
//     const id = Math.random().toString(36).substr(2, 9);
//     const newToast: ToastProps = {
//       id,
//       message,
//       type: options?.type || "info",
//       duration: options?.duration ?? 3000,
//       position: options?.position || "top-right",
//       onClose: options?.onClose,
//     };
//     setToasts((prev) => [...prev, newToast]);

//     // Auto-remove toast after duration
//     if (newToast.duration) {
//       setTimeout(() => removeToast(id), newToast.duration);
//     }
//   };

//   const removeToast = (id: string) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id));
//   };

//   return (
//     <ToasterContext.Provider value={{ showToast }}>
//       {children}
//       <ToasterContainer toasts={toasts} removeToast={removeToast} />
//     </ToasterContext.Provider>
//   );
// };
