import React, { Component } from "react";
import { connect } from "react-redux";

class Selected_Conv extends Component {
  render() {
    if (!this.props.selected_conv) return <div />;
    return (
      <div className="selected_conv">
        <div className="image">
          <img
            src={this.props.groups[this.props.selected_conv].imgURL}
            className="rounded-circle"
          />
        </div>
        <div className="name">
          {this.props.groups[this.props.selected_conv].name}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ chat, groups }) {
  return { selected_conv: chat.selected_conv, groups: groups };
}

export default connect(mapStateToProps)(Selected_Conv);
