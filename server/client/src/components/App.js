import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import "../style/main.css";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage/index";

import { FetchUser } from "../actions/";
// test
import axios from "axios";
window.axios = axios;

class App extends Component {
  componentWillMount() {
    this.props.FetchUser();
  }
  render() {
    if (!this.props.user) return <LandingPage />;
    return (
      <BrowserRouter>
        <Route path="/" component={Dashboard} />
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ user }) {
  return { user: user };
}

export default connect(
  mapStateToProps,
  { FetchUser }
)(App);
