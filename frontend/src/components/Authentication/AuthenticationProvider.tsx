import React, { createContext, useState } from "react";
import axios from "axios";
import { User } from "./UserType";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: User) => Promise<void>;
  logout: () => void;
  open: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  open: false,
});

interface AuthenticationProviderProps {
  children: React.ReactNode;
}

const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [open, setOpen] = useState(false);

  const login = async (user: User) => {
    try {
      const res = await axios.post("http://localhost:8080/login", user, {
        headers: { "Content-Type": "application/json" },
      });
      const jwtToken = res.headers.authorization;

      if (jwtToken !== null) {
        localStorage.setItem("jwt", jwtToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setOpen(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, open }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
