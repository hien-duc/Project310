import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AuthenticationProvider from "./context/AuthenticationProvider";
import BookList from "./components/Book/BookList";
import { Role } from "./components/Authentication/UserType";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import BookCategory from "./components/User-Side/BookCategory";
import HomePage from "./components/User-Side/HomePage";
import NavBar from "./components/User-Side/Navbar";
import MemberList from "./components/Member/MemberList";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";

const queryClient = new QueryClient();

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider onReady={() => setLoading(false)}>
          {!loading && (
            <>
              <NavBar />
              <Routes>
                <Route path="bookCategory" element={<BookCategory />} />
                <Route path="homePage" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route
                  path="/books"
                  element={
                    <ProtectedRoute roles={[Role.Admin]}>
                      <BookList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/members"
                  element={
                    <ProtectedRoute roles={[Role.Admin]}>
                      <MemberList />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </>
          )}
        </AuthenticationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
