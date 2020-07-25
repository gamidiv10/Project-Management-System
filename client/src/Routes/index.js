import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";
import RouteWrapper from "./authRoutes";

class ClientRoute extends Component {
  render() {
    return (
      <Switch>
        {routes.map((route, k) => (
          <RouteWrapper key={`route_${k}`} {...route} />
        ))}
      </Switch>
    );
  }
}

export default ClientRoute;
