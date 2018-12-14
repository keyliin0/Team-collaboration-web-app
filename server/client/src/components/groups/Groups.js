import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { MyGroups_PATH, ModifyGroup_PATH } from "./RoutesVars";
import MyGroups from "./MyGroups";
import EditGroup from "./EditGroup";

class Groups extends Component {
  render() {
    return (
      <div className="groups col col-10 h-75">
        <Switch>
          <Route path={MyGroups_PATH} component={MyGroups} />
          <Route path={ModifyGroup_PATH} component={EditGroup} />
        </Switch>
      </div>
    );
  }
}

export default Groups;
