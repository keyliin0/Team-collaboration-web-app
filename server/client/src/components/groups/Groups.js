import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {
  MyGroups_PATH,
  ModifyGroup_PATH,
  CreateGroup_PATH
} from "./RoutesVars";
import MyGroups from "./MyGroups";
import EditGroup from "./EditGroup";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";

class Groups extends Component {
  render() {
    return (
      <div className="groups col col-10 h-75">
        <div className="buttons">
          <button
            style={{ cursor: "pointer", margin: "10px" }}
            className="btn btn-primary"
            onClick={event => this.props.history.push(CreateGroup_PATH)}
          >
            Create a group
          </button>
          <JoinGroup />
        </div>
        <Switch>
          <Route path={MyGroups_PATH} component={MyGroups} />
          <Route path={ModifyGroup_PATH} component={EditGroup} />
          <Route path={CreateGroup_PATH} component={CreateGroup} />
        </Switch>
      </div>
    );
  }
}

export default Groups;
