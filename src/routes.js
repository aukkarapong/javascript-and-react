import { Route, Switch } from "react-router-dom";
import React, { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
// const About = lazy(() => import("./pages/About"));

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    {/* <Route exact path="/about" component={About} /> */}
    <Route component={() => <div>404 Page not found</div>} />
  </Switch>
);
