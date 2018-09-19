import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import SearchEmails from "./SearchEmails";
import NextEmails from "./NextEmails";
import PreviousEmails from "./PreviousEmails";
import DeleteEmail from "./DeleteEmail";

class Toolbox extends Component {
  render() {
    return (
      <div className="Toolbox">
        <SearchEmails />
        <DeleteEmail />
        <i className="far fa-envelope-open" title="Mark as unread" />
        <i className="far fa-envelope" title="Mark as read" />
        <PreviousEmails />
        <NextEmails />
        {this.props.messages.loading && this.props.messages.emails ? (
          <div className="loader-small" />
        ) : (
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps({ emails }) {
  return { messages: emails };
}

export default connect(
  mapStateToProps,
  actions
)(Toolbox);
