/*
 * File: /Users/michaelbeeson/Documents/VSCode/squad-force/squad-app/src/routes/index.js
 */
import React from "react";
import { Text, View } from "react-native";
import { NativeRouter, Switch, Route, Link } from "react-router-native";
import Signup from "src/routes/signup";
import Login from "src/routes/login";
import OrgSelect from "src/routes/org-select";

const Routes = ({ params }) => (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />

      <Route exact path="/org-select" component={OrgSelect} />
    </Switch>
  </NativeRouter>
);

export default Routes;
