import { useContext, useState } from "react";
import { Stack, TextField, Button, Snackbar } from "@mui/material";
import { AuthContext } from "../../context/AuthenticationProvider";
import React from "react";
import { useNavigate } from "react-router-dom";
interface LoginProps {
  redirectPath?: string; // Path to redirect after successful login
}

const Login: React.FC<LoginProps> = ({ redirectPath }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [open, setOpen] = React.useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async () => {
    await login(user);
    if (!sessionStorage.getItem("user")) {
      setOpen(true);
    } else {
      navigate(redirectPath || "/homePage");
    }
  };

  const handleToggleForm = () => {
    navigate("/register");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      mt={2}
      style={{ minHeight: "100vh" }}
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
      <Button color="inherit" onClick={handleToggleForm}>
        Switch to Register
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
