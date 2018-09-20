import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { FETCH_EMAILS } from "../../actions/types";
import { withRouter, Link } from "react-router-dom";
import _ from "lodash";

class EmailList extends Component {
  componentWillMount() {
    // if the there is some messages being loaded don't load anything
    // so the no new messages will be loaded when the user press the back button while reading a message
    if (!this.props.messages.loading && !this.props.messages.emails)
      this.props.FetchEmails("default", FETCH_EMAILS, "INBOX");
  }
  RenderEmails() {
    return _.map(this.props.messages.emails, email => {
      return (
        <li key={email.id} className={email.is_read ? "read" : ""}>
          <div className="info">
            <label className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                onClick={event => this.props.Select_Email(event, email.id)}
              />
              <span className="custom-control-indicator" />
            </label>
            <Link to={"/mail/read/" + email.id}>
              <span className="name">{email.name}</span>
              <span className="subject">{email.subject}</span>
              <span className="date">{email.date}</span>
            </Link>
          </div>
        </li>
      );
    });
  }
  render() {
    console.log(this.props.messages);
    if (this.props.messages.empty) {
      return (
        <div className="EmailList">
          <div className="empty_list">List is empty</div>
        </div>
      );
    }
    if (!this.props.messages.emails) {
      return <div className="loader" />;
    }
    return (
      <div className="EmailList">
        <ul>{this.RenderEmails()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ emails }) {
  return { messages: emails };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(EmailList)
);
