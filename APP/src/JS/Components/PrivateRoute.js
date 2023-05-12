import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ element: Element, ...rest }) {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/" />}
    />
  );
}

export default PrivateRoute;
