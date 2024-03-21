import { useState } from "react";
import LoginForm from "./Login";
import Register from "./Register";
import { Button, Stack } from "@mui/material";

const AuthContainer = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const toggleForm = () => {
    setIsLoginFormVisible((prevState) => !prevState);
  };

  return (
    <div>
      {isLoginFormVisible ? <LoginForm /> : <Register />}
      <br />
      <Stack alignItems="center">
        <Button color="inherit" onClick={toggleForm}>
          {isLoginFormVisible ? "Switch to Register" : "Switch to Login"}
        </Button>
      </Stack>
    </div>
  );
};

export default AuthContainer;
