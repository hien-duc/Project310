import { useContext, useState } from "react";
import { Stack, TextField, Button, Snackbar } from "@mui/material";
import { AuthContext } from "./AuthenticationProvider";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [open, setOpen] = React.useState(false);
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    await login(user);
    if (!isAuthenticated) {
      setOpen(true);
    } else {
      navigate("/books");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

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
};

export default Login;
