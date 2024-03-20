import { useRoutes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import AuthenticationProvider from "./components/Authentication/AuthenticationProvider";
import AuthContainer from "./components/Authentication/AuthContainer";
import BookList from "./components/Book/BookList";
import { Role } from "./components/Authentication/UserType";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate to="/login" />,
    },
    {
      path: "/",
      children: [
        {
          path: "login",
          element: <AuthContainer />,
        },
        {
          path: "admin",
          element: (
            <ProtectedRoute roles={[Role.Admin]}>
              <BookList />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <CssBaseline />
        {routes}
        {/* <Routes>
            <Route path="/" element={<AuthContainer />} />
            <Route path="/register" element={<AuthContainer />} />
            <Route path="/login" element={<AuthContainer />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/members" element={<MemberList />} />
          </Routes> */}
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}

export default App;
