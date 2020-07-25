import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../App";

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const Auth = useContext(AuthContext);
  const signed = Auth.isLoggedIn;

  // if the user is not signed in and also the route is private
  if (isPrivate && !signed) {
    return <Redirect to="/login" />;
  }

  if (!isPrivate && signed) {
    return <Redirect to="/home" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
