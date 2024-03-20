// AuthenticationProvider.tsx

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { User } from "./UserType";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../api/UserAPI";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
});

interface AuthenticationProviderProps {
  children: React.ReactNode;
}

const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState === "true") {
      setIsAuthenticated(true);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogin = async (user: User) => {
    try {
      const res = await axios.post("http://localhost:8080/login", user, {
        headers: { "Content-Type": "application/json" },
      });
      const jwtToken = res.headers.authorization;
      const a = res.data;
      console.log(a);
      if (jwtToken) {
        localStorage.setItem("jwt", jwtToken);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        setUser(user);
        console.log(localStorage.getItem("user"));
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
