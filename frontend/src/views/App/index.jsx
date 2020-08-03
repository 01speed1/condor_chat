import React from "react";
import "./App.scss";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "../Join";
import Chat from "../Chat";
import SignUp from "../SignUp";

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/chat" exact component={Chat} />
    </Router>
  );
}
