import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [accesToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      setIsAuthenticated(true);
    }
  }, []);

  const saveToken = (token) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    setIsAuthenticated(true);
  };

  const removeToken = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ accesToken, isAuthenticated, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};