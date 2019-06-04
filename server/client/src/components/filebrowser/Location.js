import React, { Component } from "react";
import { connect } from "react-redux";

class Location extends Component {
  render() {
    if (!this.props.groups) return <div className="Location" />;
    return (
      <div className="Location">
        {this.props.groups[this.props.group_id].name}
      </div>
    );
  }
}

function mapStateToProps({ groups }) {
  return { groups: groups };
}

export default connect(mapStateToProps)(Location);
