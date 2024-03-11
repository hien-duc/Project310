import React, { useState } from "react";
import { TextField, Button, Stack, Snackbar } from "@mui/material";
import axios from "axios";
import BookList from "./Booklist";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [open, setOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", user);
      const token = response.headers.authorization;
      if (token !== null) {
        const splitToken = token.split("Bearer ");
        localStorage.setItem("jwt", splitToken[1]);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setOpen(true);
    }
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  if (isLoggedIn) {
    return <BookList />;
  } else {
    return (
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <TextField name="username" label="Username" onChange={handleChange} />
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
        />
        <Button variant="outlined" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Login failed: Check your username and password"
        />
      </Stack>
    );
  }
}

export default Login;
