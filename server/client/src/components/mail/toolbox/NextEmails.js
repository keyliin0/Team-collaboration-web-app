import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { FETCH_EMAILS } from "../../../actions/types";

class NextEmails extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.FetchEmails(
      this.props.messages.nextpage,
      FETCH_EMAILS,
      this.props.messages.label,
      this.props.messages.query
    );
  }
  render() {
    if (this.props.messages.loading || !this.props.messages.nextpage) {
      return <i className="far fa-arrow-alt-circle-right disabled-icon" />;
    }
    return (
      <i className="far fa-arrow-alt-circle-right" onClick={this.handleClick} />
    );
  }
}

function mapStateToProps({ emails }) {
  return { messages: emails };
}

export default connect(
  mapStateToProps,
  actions
)(NextEmails);
