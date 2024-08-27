import { ReactNode } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Logout } from "@/redux/features/auth/authSlice";

export type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const location = useLocation();
  console.log(role);
  const token = useAppSelector((state) => state.auth.token);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  // @ts-expect-error: Unreachable code error
  if (role !== undefined && role !== user?.role) {
    dispatch(Logout());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
