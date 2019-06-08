import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchNotifications, FetchGroups, JoinSocketRoom } from "../../actions";
import Notification from "./Notification";
import _ from "lodash";
import onClickOutside from "react-onclickoutside";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  componentWillMount() {
    this.props.FetchNotifications(
      Object.keys(this.props.notifications).length,
      7
    );
  }
  handleClickOutside = () => {
    this.setState({ open: false });
  };
  renderNotifications() {
    return _.map(this.props.notifications, notification => {
      return (
        <Notification
          key={notification._id}
          id={notification._id}
          title={notification.title}
          timestamp={notification.timestamp}
          type={notification.type}
          group_id={notification.group_id}
          seen={notification.seen}
        />
      );
    });
  }
  renderButton() {
    var not_count = 0;
    _.map(this.props.notifications, notification => {
      if (!notification.seen) not_count++;
    });
    return (
      <i
        className={"fas fa-bell icon " + (not_count ? "not_seen" : "")}
        onClick={() => this.setState({ open: !this.state.open })}
      />
    );
  }
  LoadMore() {
    this.props.FetchNotifications(
      Object.keys(this.props.notifications).length,
      7
    );
  }
  render() {
    return (
      <li className="notifications">
        {this.renderButton()}
        <div
          className="notification-container"
          style={{ display: this.state.open ? "inline-block" : "none" }}
        >
          <div className="wrapper">
            <div className="header">Notifications</div>
            <div className="list">
              <ul>{this.renderNotifications()}</ul>
            </div>
            <div className="loadmore" onClick={() => this.LoadMore()}>
              Load More
            </div>
          </div>
        </div>
      </li>
    );
  }
}

function mapStateToProps({ notifications, groups }) {
  return { notifications: notifications, groups: groups };
}

export default connect(
  mapStateToProps,
  { FetchNotifications, JoinSocketRoom, FetchGroups }
)(onClickOutside(Notifications));
