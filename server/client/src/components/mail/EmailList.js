import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { FETCH_EMAILS } from "../../actions/types";
import { withRouter } from "react-router-dom";

class EmailList extends Component {
  componentWillMount() {
    this.props.FetchEmails("default", FETCH_EMAILS, "INBOX");
  }
  RenderEmails() {
    return this.props.messages.emails.map(email => {
      return (
        <li key={email.id}>
          <div className="info">
            <label className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" />
              <span className="custom-control-indicator" />
            </label>
            <span className="name">{email.name}</span>
            <span className="subject">{email.subject}</span>
            <span className="date">{email.date}</span>
          </div>
        </li>
      );
    });
  }
  render() {
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
