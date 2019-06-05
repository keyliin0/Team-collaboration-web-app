import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchNotifications } from "../../actions";
import Notification from "./Notification";
import _ from "lodash";

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
  LoadMore() {
    this.props.FetchNotifications(
      Object.keys(this.props.notifications).length,
      7
    );
  }
  render() {
    return (
      <li className="notifications">
        <i
          className="fas fa-bell icon"
          onClick={() => this.setState({ open: !this.state.open })}
        />
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

function mapStateToProps({ notifications }) {
  return { notifications: notifications };
}

export default connect(
  mapStateToProps,
  { FetchNotifications }
)(Notifications);
