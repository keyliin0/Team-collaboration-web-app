import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { FETCH_EMAILS } from "../../../actions/types";

class DeleteEmail extends Component {
  HandleClick() {
    const { selected_emails } = this.props;
    this.props.DeleteEmails(selected_emails).then(() => {
      this.props.FetchEmails("default", FETCH_EMAILS, selected_emails.folder);
    });
  }
  render() {
    if (this.props.selected_emails.emails.length === 0)
      return <i className="far fa-trash-alt disabled-icon" title="Delete" />;
    else
      return (
        <i
          className="far fa-trash-alt"
          title="Delete"
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
)(DeleteEmail);
