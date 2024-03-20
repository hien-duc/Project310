import { memo, ReactNode, useContext } from "react";

import { Navigate } from "react-router-dom";
import { Role } from "../../components/Authentication/UserType.ts";
import { AuthContext } from "./AuthenticationProvider.tsx";

type ProtectedRouteProps = {
  children: ReactNode;
  redirectPath?: string;
  roles?: Role[];
};

const ProtectedRoute = ({
  redirectPath,
  children,
  roles = [Role.Guest],
}: ProtectedRouteProps) => {
  // mock data
  // const user: User = {
  //   name: "Thai Blog",
  //   age: 18,
  //   role: Role.Collaborator,
  // };
  const { user } = useContext(AuthContext); // Retrieve user from AuthContext
  const isGuest = roles.includes(Role.Guest);
  const isMatchRole = user && roles.includes(user.role); // Check if user exists before accessing its role
  let isAllow = isGuest || isMatchRole;

  if (!isAllow) {
    return <Navigate to={redirectPath ?? "/login"} />;
  }

  return <>{children}</>;
};

export default memo(ProtectedRoute);
