import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";
import PrivateRoute from "./PrivateRoute";

const ClientRoute = () => {
  return (
    <Switch>
      {routes.map((route, k) => {
        {
          return route.isPrivate ? (
            <PrivateRoute
              key={`route_${k}`}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ) : (
            <Route
              key={`route_${k}`}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          );
        }
      })}
    </Switch>
  );
};

export default ClientRoute;
