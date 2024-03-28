import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { User } from "../components/Type/UserType";
import { Member } from "../components/Type/MemberType";
import { useNavigate } from "react-router-dom";
import { Book2 } from "../components/Type/BookType";
import { ShoppingCart } from "../components/Cart/ShoppingCart";

interface AuthContextType {
  openCart: () => void;
  closeCart: () => void;
  isAuthenticated: boolean;
  user: User | null;
  member: Member | null;
  book: Book2[] | null;
  login: (user: User) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  openCart: () => null,
  closeCart: () => null,
  isAuthenticated: false,
  user: null,
  member: null,
  book: [],
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
  const [book, setBook] = useState<Book2[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    const storedAuthState = sessionStorage.getItem("isAuthenticated");

    if (storedAuthState === "true") {
      setIsAuthenticated(true);
      const storedUser = sessionStorage.getItem("user");
      const storedMember = sessionStorage.getItem("member");
      const storedBook = sessionStorage.getItem("book");

      if (storedUser && storedMember && storedBook) {
        setUser(JSON.parse(storedUser));
        setMember(JSON.parse(storedMember));
        setBook(JSON.parse(storedBook));
      }
    }
    onReady();
  }, [onReady]);

  const handleLogin = async (user: User) => {
    try {
      const header = {
        headers: { "Content-Type": "application/json" },
      };

      const res = await axios.post("http://localhost:8080/login", user, header);
      const jwtToken = res.headers.authorization;
      if (jwtToken) {
        sessionStorage.setItem("jwt", jwtToken);
        sessionStorage.setItem("isAuthenticated", "true");
        const temp = await axios.get(
          "http://localhost:8080/api/appUsers/search/findByUsername?username=" +
            user.username,
          header
        );
        user.role = temp.data.role;
        sessionStorage.setItem("user", JSON.stringify(user));

        const memLink = temp.data._links.member.href;
        const memberResponse = await axios.get(memLink, header);

        sessionStorage.setItem("member", JSON.stringify(memberResponse.data));
        const bookLink = memberResponse.data._links.books.href;
        const bookResponse = await axios.get(bookLink, header);
        const books = bookResponse.data._embedded.books;

        sessionStorage.setItem("book", JSON.stringify(books));
        setBook(books);
        setMember(memberResponse.data);
        setIsAuthenticated(true);
        setUser(user);
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
      setBook(null);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("member");
    sessionStorage.removeItem("book");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/homePage");
  };

  return (
    <AuthContext.Provider
      value={{
        openCart,
        closeCart,
        isAuthenticated,
        user,
        member,
        book,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
