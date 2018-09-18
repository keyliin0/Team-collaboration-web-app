import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { FETCH_EMAILS } from "../../actions/types";
import { withRouter } from "react-router-dom";
import { EmailList_PATH } from "./RoutesVars";

class Folders extends Component {
  handleClick(label) {
    // in case the user is reading an email and want to navigate to another folder
    // make him go to the emails list router first to avoid errors
    this.props.ClearEmails();
    if (this.props.location.pathname.toLowerCase() !== EmailList_PATH) {
      this.props.history.push(EmailList_PATH);
    }
    this.props.FetchEmails("default", FETCH_EMAILS, label);
  }
  render() {
    return (
      <ul>
        <li className="compose">
          <button className="btn btn-primary">Compose</button>
        </li>
        <li>
          <span onClick={() => this.handleClick("INBOX")}>Inbox</span>
        </li>

        <li>
          <span onClick={() => this.handleClick("SENT")}>Sent</span>
        </li>

        <li>
          <span onClick={() => this.handleClick("DRAFT")}>Drafts</span>
        </li>

        <li>
          <span onClick={() => this.handleClick("SPAM")}>Spam</span>
        </li>
        <li>
          <span onClick={() => this.handleClick("TRASH")}>Trash</span>
        </li>
      </ul>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(Folders)
);
