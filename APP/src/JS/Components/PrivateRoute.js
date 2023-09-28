import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { SessionContext } from "../Session/SessionContext";

function PrivateRoute({ element }) {
  const userSesion = useContext(SessionContext).userSesion;

  if (!userSesion) {
    return <Navigate to={'/'} replace />;
  }

  return element;
}

export default PrivateRoute;
