import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import useInsta from "../Hook/useInsta";

const Instar = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isInsta, isInstaLoading] = useInsta();

  if (loading || isInstaLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isInsta) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default Instar;
