import { Route, Switch } from "react-router-dom";
import React, { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const AboutV1 = lazy(() => import("./pages/AboutV1"));

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about-v1" component={AboutV1} />
    <Route component={() => <div>404 Page not found</div>} />
  </Switch>
);
