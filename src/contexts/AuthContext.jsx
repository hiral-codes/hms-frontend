import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";
import { Spinner } from "@chakra-ui/react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await api.get("/auth/check", {
            headers: {
              Authorization: `${token}`
            }
          });
          const userData = response.data;
          userData.avatar = getAvatar(userData);
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          throw new Error("No token found");
        }
      } catch (error) {
        console.error("Failed to verify token:", error);
        setUser(null);
        localStorage.removeItem("user");
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
      const userData = response.data;
      userData.avatar = getAvatar(userData);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
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
      localStorage.removeItem("user");
    }
  };

  const getAvatar = (userData) => {
    if (userData && userData.image && userData.image.data) {
      try {
        const byteArray = new Uint8Array(userData.image.data);
        const blob = new Blob([byteArray], { type: "image/png" });
        return URL.createObjectURL(blob);
      } catch (error) {
        console.error("Error generating Blob URL:", error);
        return "/avatar.png";
      }
    }
    return "/avatar.png";
  };

  if (loading) {
    return (
      <div className="h-screen z-50 flex items-center justify-center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.600"
          size="xl"
        />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user,setUser, login, logout, getAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
