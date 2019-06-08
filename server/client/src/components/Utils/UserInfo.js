import React, { Component } from "react";
import { connect } from "react-redux";

class UserInfo extends Component {
  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <li>
          <span>
            {this.props.user.firstname + " " + this.props.user.lastname}
          </span>
        </li>
        <li>
          <img src={this.props.user.imgURL} className="rounded-circle" alt="" />
        </li>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user: user };
}

export default connect(mapStateToProps)(UserInfo);
