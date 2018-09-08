import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Mails from "./Mails";
import Utils from "./Utils";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Navbar />
          <Mails />
          <Utils />
        </div>
      </div>
    );
  }
}
