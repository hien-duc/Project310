import React, { useState } from "react";
import { Stack, TextField, Button, Snackbar } from "@mui/material";
import { doAddUser, fetchUser } from "../../api/UserAPI";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const Register: React.FC = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const { mutate } = useMutation(fetchUser, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["books"]);
  //   },
  //   onError: (err) => {
  //     console.error(err);
  //   },
  // });

  const handleRegister = async () => {
    try {
      // Fetch user data to check if username exists
      const hashedPasswordPromise = hashPassword(user.password);
      const hashedPassword = await hashedPasswordPromise;
      const userData = await fetchUser();

      // Check if the username already exists
      const usernameExists = userData.some(
        (user1: { username: string; password: string }) =>
          user1.username === user.username
      );
      if (usernameExists) {
        setNotificationMessage("Username already exists");
        setOpen(true);
        return;
      }
      if (user.password !== user.confirmPassword) {
        setNotificationMessage("Password is not matched");
        setOpen(true);
        return;
      }
      doAddUser({
        username: user.username,
        password: hashedPassword,
        role: "GUEST",
      });

      setUser({
        username: "",
        password: "",
        confirmPassword: "",
      });

      setNotificationMessage("Registration successful");
      setOpen(true);
    } catch (error) {
      console.error("Error registering user:", error);
      setNotificationMessage("Registration failed");
      setOpen(true);
    }
  };
  const navigate = useNavigate();

  const handleToggleForm = () => {
    navigate("/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={2} alignItems="center" mt={2}>
      <TextField
        name="username"
        label="Username"
        value={user.username}
        onChange={handleChange}
      />
      <TextField
        type="password"
        name="password"
        label="Password"
        value={user.password}
        onChange={handleChange}
      />
      <TextField
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        value={user.confirmPassword}
        onChange={handleChange}
      />
      <Button variant="outlined" color="primary" onClick={handleRegister}>
        Register
      </Button>
      <Button color="inherit" onClick={handleToggleForm}>
        Switch to Register
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={notificationMessage}
      />
    </Stack>
  );
};

export default Register;
