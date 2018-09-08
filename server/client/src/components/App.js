import React, { Component } from "react";
import "../style/main.css";
//import "../style/grid.css";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
// test
import axios from "axios";
window.axios = axios;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default App;
