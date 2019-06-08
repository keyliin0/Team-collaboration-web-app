import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Mails from "./mail/Mails";
import Groups from "./groups/Groups";
import Chatroom from "./chat/Chatroom";
import Calendar from "./calendar/Calendar";
import CalendarGroups from "./calendar/MyGroups";
import TasksGroups from "./tasks/MyGroups";
import TaskBoard from "./tasks/TaskBoard";
import FileBrowserGroups from "./filebrowser/MyGroups";
import FileBrowser from "./filebrowser/FileBrowser";
import Utils from "./Utils/Utils";
import { FetchGroups, JoinSocketRoom } from "../actions";
import { connect } from "react-redux";
import _ from "lodash";

class Dashboard extends Component {
  componentWillMount() {
    this.props.FetchGroups().then(() => {
      const { groups } = this.props;
      _.map(groups, group => {
        this.props.JoinSocketRoom(group._id); // join group room to listen for notifications and chat messages
      });
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="dashboard">
          <div className="container-fluid">
            <div className="row">
              <div className="col col-2 mh-100">
                <Navbar />
              </div>
              <div className="col col-10">
                <Utils />
                <Switch>
                  <Route path={"/mail"} component={Mails} />
                  <Route path={"/groups"} component={Groups} />
                  <Route path={"/chat"} component={Chatroom} />
                  <Route path={"/chat/:id"} component={Chatroom} />
                  <Route path={"/calendar/:id"} component={Calendar} />
                  <Route path={"/calendar"} component={CalendarGroups} />
                  <Route path={"/tasks/:id"} component={TaskBoard} />
                  <Route path={"/tasks"} component={TasksGroups} />
                  <Route path={"/filebrowser/:id"} component={FileBrowser} />
                  <Route path={"/filebrowser"} component={FileBrowserGroups} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ groups }) {
  return { groups: groups };
}

export default connect(
  mapStateToProps,
  { JoinSocketRoom, FetchGroups }
)(Dashboard);
