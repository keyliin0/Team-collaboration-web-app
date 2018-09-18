import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { FETCH_PREVIOUS_EMAILS } from "../../../actions/types";

class PreviousEmails extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.FetchEmails(
      this.props.messages.previous[this.props.messages.previous.length - 2],
      FETCH_PREVIOUS_EMAILS,
      this.props.messages.label
    );
  }
  render() {
    if (
      this.props.messages.loading ||
      this.props.messages.previous.length <= 1
    ) {
      return <i className="far fa-arrow-alt-circle-left disabled-icon" />;
    }
    return (
      <i className="far fa-arrow-alt-circle-left" onClick={this.handleClick} />
    );
  }
}

function mapStateToProps({ emails }) {
  return { messages: emails };
}

export default connect(
  mapStateToProps,
  actions
)(PreviousEmails);
