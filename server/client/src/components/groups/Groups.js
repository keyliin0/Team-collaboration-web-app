import React, { Component } from "react";
import { Switch, Router, Route } from "react-router-dom";
import MyGroups from "./MyGroups";

class Groups extends Component {
  render() {
    return (
      <div className="groups col col-11 h-75">
        <MyGroups />
      </div>
    );
  }
}

export default Groups;
