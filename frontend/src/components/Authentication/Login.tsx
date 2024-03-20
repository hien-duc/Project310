import { useContext, useState } from "react";
import { Stack, TextField, Button, Snackbar } from "@mui/material";
import { AuthContext } from "./AuthenticationProvider";
import BookList from "../Book/BookList";
import React from "react";

const Login: React.FC = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "GUEST",
  });
  const [open, setOpen] = React.useState(false);
  const { login, isAuthenticated } = useContext(AuthContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    await login(user);
    if (!isAuthenticated) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (isAuthenticated) {
    return <BookList />;
  } else {
    return (
      <Stack spacing={2} alignItems="center" mt={2}>
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
          onClose={handleClose}
          message="Login failed: Check your username and password"
        />
      </Stack>
    );
  }
};

export default Login;
