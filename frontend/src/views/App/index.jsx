import React from "react";
import "./App.scss";

import { BrowserRouter as Router } from "react-router-dom";

import Join from "../Join";
import Dashboard from "../Dashboard";
import SignUp from "../SignUp";
import PrivateRoute from "../../shared/Auth/PrivateRoute";
import PublicRoute from "../../shared/Auth/PublicRoute";

export default function App() {
  return (
    <Router>
      <PublicRoute path="/signup" component={SignUp} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PublicRoute path="/" exact component={Join} />
    </Router>
  );
}
