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
  );
}

export default App;
