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
            <Route
              path="/books"
              element={
                <ProtectedRoute roles={[Role.Guest]}>
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
  );
}

export default App;
