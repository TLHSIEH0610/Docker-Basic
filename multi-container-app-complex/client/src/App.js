import React from "react";
import "./App.css";
// import { BrowserRouter as Router, Route } from "react-router-dom";

import Fib from "./Fib";

function App() {
  return (
    <Fib />
    // <Router>
    //   <Route exact path="/" component={Fib} />
    // </Router>
  );
}

export default App;
