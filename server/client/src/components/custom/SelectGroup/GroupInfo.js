import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class GroupInfo extends Component {
  render() {
    const { id, name, img } = this.props;
    return (
      <div
        className="info"
        onClick={event => this.props.history.push(this.props.route + "/" + id)}
      >
        <div className="picture">
          <img src={img} alt={name} className="rounded-circle" />
        </div>
        <div className="desc">{name}</div>
      </div>
    );
  }
}

export default withRouter(GroupInfo);
