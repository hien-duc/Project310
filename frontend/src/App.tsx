<<<<<<< HEAD
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Login";
const queryClient = new QueryClient();
import "./App.css";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Hero from "./components/Hero";
// import Footer from "./components/Footer";
// import BookSection from "./components/BookSection";
import BookCategory from "./components/BookCategory";
import HomePage from "./components/HomePage";
import BookList from "./components/Booklist";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="bookCategory" element={<BookCategory />} />
          <Route
            path="/login"
            element={
              <QueryClientProvider client={queryClient}>
                <Login />
              </QueryClientProvider>
            }
          />
          <Route path="homePage" element={<HomePage />} />
          <Route path="bookList" element={<BookList />} />
        </Routes>
        <Container maxWidth="xl">
          <CssBaseline />
          {/* <Toolbar>
          <Typography variant="h6">Book Shop</Typography>
        </Toolbar> */}
          <QueryClientProvider client={queryClient}></QueryClientProvider>
        </Container>
      </BrowserRouter>
    </>
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AuthenticationProvider from "./components/Authentication/AuthenticationProvider";
import AuthContainer from "./components/Authentication/AuthContainer";
import BookList from "./components/Book/BookList";
import { Role } from "./components/Authentication/UserType";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import BookCategory from "./components/User-Side/BookCategory";
import HomePage from "./components/User-Side/HomePage";
import NavBar from "./components/User-Side/Navbar";
import MemberList from "./components/Member/MemberList";
const queryClient = new QueryClient();

function App() {
  // const routes = useRoutes([
  //   {
  //     path: "/",
  //     index: true,
  //     element: <Navigate to="/login" />,
  //   },
  //   {
  //     path: "/",
  //     children: [
  //       {
  //         path: "login",
  //         element: <AuthContainer />,
  //       },
  //       {
  //         path: "books",
  //         element: (
  //           <ProtectedRoute roles={[Role.Admin]}>
  //             <BookList />
  //           </ProtectedRoute>
  //         ),
  //       },
  //     ],
  //   },
  // ]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <NavBar />

          <Routes>
            <Route path="bookCategory" element={<BookCategory />} />
            <Route path="homePage" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <QueryClientProvider client={queryClient}>
                  <AuthContainer />
                </QueryClientProvider>
              }
            />
            <Route
              path="/"
              element={
                <QueryClientProvider client={queryClient}>
                  <AuthContainer />
                </QueryClientProvider>
              }
            />
            {/* <Route path="bookList" element={<BookList />} /> */}
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
        </AuthenticationProvider>
      </QueryClientProvider>
    </BrowserRouter>
>>>>>>> Minh
  );
}

export default App;
