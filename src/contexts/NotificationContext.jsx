import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ code: '', type: '', open: false });

  const openNotification = () => {
    setNotification((prev) => ({ ...prev, open: true }));
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  const updateNotification = (code, type) => {
    setNotification((prev) => ({
      ...prev,
      code: code,
      type: type
    }));
  }

  return (
    <NotificationContext.Provider value={{ notification, updateNotification, closeNotification, openNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
