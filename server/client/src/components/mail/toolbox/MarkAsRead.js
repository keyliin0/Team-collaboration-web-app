import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";

class MarkAsRead extends Component {
  HandleClick() {
    const { selected_emails } = this.props;
    this.props.Mark_Read_Unread(selected_emails.emails, true);
  }
  render() {
    if (this.props.selected_emails.emails.length === 0)
      return (
        <i className="far fa-envelope disabled-icon" title="Mark as read" />
      );
    else
      return (
        <i
          className="far fa-envelope"
          title="Mark as read"
          onClick={() => this.HandleClick()}
        />
      );
  }
}

function mapStateToProps({ selected_emails }) {
  return { selected_emails: selected_emails };
}

export default connect(
  mapStateToProps,
  actions
)(MarkAsRead);
