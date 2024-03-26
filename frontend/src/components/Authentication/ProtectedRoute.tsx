import { memo, ReactNode, useContext } from "react";

import { Navigate } from "react-router-dom";
import { Role } from "../Type/UserType.ts";
import { AuthContext } from "../../context/AuthenticationProvider.tsx";

type ProtectedRouteProps = {
  children?: ReactNode;
  redirectPath?: string;
  roles?: Role[];
};

const ProtectedRoute = ({
  redirectPath,
  children,
  roles = [Role.Guest],
}: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);
  const isGuest = roles.includes(Role.Guest);
  const isMatchRole = user && roles.includes(user.role as Role);
  const isAllow = isGuest || isMatchRole;
  if (!isAllow) {
    return <Navigate to={redirectPath ?? "/login"} />;
  }
  return <>{children}</>;
};

export default memo(ProtectedRoute);
