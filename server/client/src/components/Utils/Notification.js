import React, { Component } from "react";
import TimeAgo from "timeago-react";
import { MarkNotificationSeen } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  MODIFY_TASK,
  ADD_TASK,
  MODIFY_EVENT,
  ADD_EVENT
} from "../../actions/types";

const icons = {
  MODIFY_TASK: "fas fa-tasks",
  ADD_TASK: "fas fa-tasks",
  MODIFY_EVENT: "fas fa-calendar-alt",
  ADD_EVENT: "fas fa-calendar-alt"
};

const route = {
  MODIFY_TASK: "/tasks/",
  ADD_TASK: "/tasks/",
  MODIFY_EVENT: "/calendar/",
  ADD_EVENT: "/calendar/"
};

class Notification extends Component {
  handleClick() {
    this.props.MarkNotificationSeen(this.props.id);
    this.props.history.push(route[this.props.type] + this.props.group_id);
  }
  render() {
    return (
      <li
        className={"item " + (this.props.seen ? "seen" : "")}
        onClick={() => this.handleClick()}
      >
        <div className="icon">
          <i className={icons[this.props.type]} />
        </div>
        <div className="info">
          <div className="title">{this.props.title}</div>
          <div className="date">
            <TimeAgo datetime={this.props.timestamp} />
          </div>
        </div>
      </li>
    );
  }
}

export default withRouter(
  connect(
    null,
    { MarkNotificationSeen }
  )(Notification)
);
