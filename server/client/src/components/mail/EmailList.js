import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { FETCH_EMAILS } from "../../actions/types";
import { withRouter, Link } from "react-router-dom";
import _ from "lodash";

class EmailList extends Component {
  componentWillMount() {
    if (!this.props.messages.emails)
      this.props.FetchEmails("default", FETCH_EMAILS, "INBOX");
  }

  RenderEmails() {
    return _.map(this.props.messages.emails, email => {
      return (
        <li key={email.id}>
          <Link to={"/mail/read/" + email.id}>
            <div className="info">
              <label className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" />
                <span className="custom-control-indicator" />
              </label>
              <span className="name">{email.name}</span>
              <span className="subject">{email.subject}</span>
              <span className="date">{email.date}</span>
            </div>
          </Link>
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
