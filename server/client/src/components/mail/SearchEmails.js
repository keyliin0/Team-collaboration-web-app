import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { FETCH_EMAILS, FETCH_PREVIOUS_EMAILS } from "../../actions/types";

class SearchEmails extends Component {
  constructor(props) {
    super(props);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleLefttClick = this.handleLefttClick.bind(this);
    this.state = { loading: false };
  }
  // go to previous message
  handleLefttClick() {
    this.setState({ loading: true });
    this.props
      .FetchEmails(
        this.props.messages.previous[this.props.messages.previous.length - 2],
        FETCH_PREVIOUS_EMAILS,
        this.props.messages.label
      )
      .then(() => {
        this.setState({ loading: false });
      });
  }
  // fetch new messages on right click
  handleRightClick() {
    this.setState({ loading: true });
    var page = this.props.messages.nextpage;
    this.props
      .FetchEmails(
        this.props.messages.nextpage,
        FETCH_EMAILS,
        this.props.messages.label
      )
      .then(() => {
        this.setState({ loading: false });
      });
  }
  // handle rendering of right button depending on the state
  RenderRightIcon() {
    if (this.state.loading || !this.props.messages.nextpage) {
      return <i class="far fa-arrow-alt-circle-right disabled-icon" />;
    }
    return (
      <i
        class="far fa-arrow-alt-circle-right"
        onClick={this.handleRightClick}
      />
    );
  }
  // handle rendering of left button depending on the state
  RenderLeftIcon() {
    if (this.state.loading || this.props.messages.previous.length <= 1) {
      return <i class="far fa-arrow-alt-circle-left disabled-icon" />;
    }
    return (
      <i class="far fa-arrow-alt-circle-left" onClick={this.handleLefttClick} />
    );
  }
  render() {
    return (
      <div>
        <div className="form-group">
          <input type="text" />
        </div>
        <i className="far fa-trash-alt" title="Delete" />
        <i className="far fa-envelope-open" title="Mark as unread" />
        <i className="far fa-envelope" title="Mark as read" />
        {this.RenderLeftIcon()}
        {this.RenderRightIcon()}
        {this.state.loading ? "Loading..." : ""}
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
  )(SearchEmails)
);
