import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { User } from "../components/Authentication/UserType";
import { Member } from "../components/Member/MemberType";
import { useNavigate } from "react-router-dom";
import { Book } from "../components/Book/BookType";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  member: Member | null;
  book: Book[] | null;
  login: (user: User) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  member: null,
  book: null,
  login: async () => {},
  logout: () => {},
});

interface AuthenticationProviderProps {
  children: React.ReactNode;
  onReady: () => void;
}

const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
  onReady,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [book, setBook] = useState<Book[] | null>(null);

  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState === "true") {
      setIsAuthenticated(true);
      const storedUser = localStorage.getItem("user");
      const storedMember = localStorage.getItem("member");
      const storedBook = localStorage.getItem("book");

      if (storedUser && storedMember && storedBook) {
        setUser(JSON.parse(storedUser));
        setMember(JSON.parse(storedMember));
        setBook(JSON.parse(storedBook));
      }
    }
    onReady();
  }, [onReady]);

  const handleLogin = async (user: User) => {
    const header = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      const res = await axios.post("http://localhost:8080/login", user, header);
      const jwtToken = res.headers.authorization;

      if (jwtToken) {
        localStorage.setItem("jwt", jwtToken);
        localStorage.setItem("isAuthenticated", "true");
        const temp = await axios.get(
          "http://localhost:8080/api/appUsers/search/findByUsername?username=" +
            user.username,
          header
        );
        user.role = temp.data.role;
        localStorage.setItem("user", JSON.stringify(user));

        setIsAuthenticated(true);
        setUser(user);

        const memLink = temp.data._links.member.href;
        const memberResponse = await axios.get(memLink, header);
        setMember(memberResponse.data);
        localStorage.setItem("member", JSON.stringify(memberResponse.data));
        const bookLink = memberResponse.data._links.books.href;
        const bookResponse = await axios.get(bookLink, header);
        setBook(bookResponse.data._embedded);
        localStorage.setItem(
          "book",
          JSON.stringify(bookResponse.data._embedded)
        );
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setMember(null);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      setMember(null);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("member");
    localStorage.removeItem("book");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/homePage");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        member,
        book,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
