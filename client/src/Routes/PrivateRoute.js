/**
 * @author Satya Kumar Itekela <satya.itekela@dal.ca>
 */
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ Component, isLoggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return isLoggedIn ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        );
      }}
    />
  );
};

export default PrivateRoute;
