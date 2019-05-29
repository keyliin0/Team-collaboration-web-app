import React, { Component } from "react";
import _ from "lodash";

class Users extends Component {
  RenderUsers() {
    return _.map(this.props.users, user => {
      return (
        <li key={user._id}>
          <img
            className="rounded-circle image"
            width="40"
            height="40"
            src={user.imgURL}
          />
        </li>
      );
    });
  }
  render() {
    return <ul className="users">{this.RenderUsers()}</ul>;
  }
}

export default Users;
