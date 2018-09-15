import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { FETCH_EMAILS } from "../../actions/types";

class Folders extends Component {
  handleClick(label) {
    this.props.ClearEmails();
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

export default connect(
  null,
  actions
)(Folders);
