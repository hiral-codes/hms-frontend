import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage for user data
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await api.get("/auth/check");
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data)); // Save user data to localStorage
      } catch (error) {
        console.error("Failed to verify token:", error);
        setUser(null);
        localStorage.removeItem("user"); // Remove user data from localStorage on error
      }
      setLoading(false);
    };

    if (!user) {
      checkLoggedIn();
    } else {
      setLoading(false);
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data)); // Save user data to localStorage
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(
        "Login failed. Please check your credentials and try again."
      );
    }
  };


  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Failed to logout:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user"); // Remove user data from localStorage on logout
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
