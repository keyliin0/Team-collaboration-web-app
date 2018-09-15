import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Mails from "./mail/Mails";
import Utils from "./Utils";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col col-2">
              <Navbar />
            </div>
            <div className="col col-10">
              <Utils />
              <BrowserRouter>
                <div>
                  <Route path={"/mail"} component={Mails} />
                </div>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
