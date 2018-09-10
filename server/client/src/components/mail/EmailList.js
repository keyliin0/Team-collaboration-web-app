import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class EmailList extends Component {
  componentWillMount() {
    this.props.FetchEmails();
  }
  RenderEmails() {
    console.log(this.props.emails);
    return this.props.emails.map(email => {
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
    if (!this.props.emails.length) {
      return <div className="loader" />;
    }
    return <ul>{this.RenderEmails()}</ul>;
  }
}

function mapStateToProps({ emails }) {
  return { emails };
}

export default connect(
  mapStateToProps,
  actions
)(EmailList);
