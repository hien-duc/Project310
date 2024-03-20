import { useState } from "react";
import LoginForm from "./Login";
import Register from "./Register";

const AuthContainer = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const toggleForm = () => {
    setIsLoginFormVisible((prevState) => !prevState);
  };

  return (
    <div>
      {isLoginFormVisible ? <LoginForm /> : <Register />}
      <br />
      <button onClick={toggleForm}>
        {isLoginFormVisible ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
};

export default AuthContainer;
