import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import "../style/main.css";
import Dashboard from "./Dashboard";
import { FetchUser } from "../actions/";
// test
import axios from "axios";
window.axios = axios;

class App extends Component {
  componentWillMount() {
    this.props.FetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { FetchUser }
)(App);
