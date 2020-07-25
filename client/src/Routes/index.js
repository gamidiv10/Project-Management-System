import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "../App";

const ClientRoute = () => {
  const Auth = useContext(AuthContext);
  return (
    <Switch>
      {routes.map((route, k) => (
        <Route
          key={`route_${k}`}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      ))}
    </Switch>
  );
};

export default ClientRoute;
