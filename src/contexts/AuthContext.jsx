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
  const [sessionToken, setSessionToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAccessToken = sessionStorage.getItem("sessionToken");
    if (storedAccessToken) {
      setSessionToken(storedAccessToken);
      setIsAuthenticated(true);
    }
  }, []);

  const saveToken = (token) => {
    sessionStorage.setItem("sessionToken", token);
    setSessionToken(token);
    setIsAuthenticated(true);
  };

  const removeToken = () => {
    localStorage.removeItem("sessionToken");
    setSessionToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ sessionToken, isAuthenticated, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};