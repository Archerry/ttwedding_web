import { Navigate } from "react-router-dom";
import React, { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

const AuthComponent: React.FC<Props> = ({ children }) => {
  const isLogin = localStorage.getItem('Authorization');
  return isLogin ? children : <Navigate to="/login" replace />;
};

export default AuthComponent;
