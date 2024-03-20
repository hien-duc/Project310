import { Navigate, Route, Routes } from "react-router-dom";
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
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<AuthContainer />} />
          <Route
            path="/books"
            element={
              <ProtectedRoute roles={[Role.Admin]}>
                <BookList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}

export default App;
