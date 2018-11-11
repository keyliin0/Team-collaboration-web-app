import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Mails from "./mail/Mails";
import Groups from "./groups/Groups";
import Utils from "./Utils";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col col-2 mh-100">
              <Navbar />
            </div>
            <div className="col col-10">
              <Utils />
              <BrowserRouter>
                <Switch>
                  <Route path={"/mail"} component={Mails} />
                  <Route path={"/groups"} component={Groups} />
                </Switch>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
