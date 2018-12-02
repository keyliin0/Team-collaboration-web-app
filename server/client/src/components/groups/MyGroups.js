import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchGroups } from "../../actions";
import GroupInfo from "./GroupInfo";
import _ from "lodash";

class MyGroups extends Component {
  getgroups() {
    return _.map(this.props.groups, group => {
      return <GroupInfo name={group.name} />;
    });
  }
  componentWillMount() {
    this.props.FetchGroups();
  }
  render() {
    if (!this.props.groups) return <div className="loader" />;
    return <div className="mygroups">{this.getgroups()}</div>;
  }
}

function mapStateToProps({ groups }) {
  return { groups };
}

export default connect(
  mapStateToProps,
  { FetchGroups }
)(MyGroups);
